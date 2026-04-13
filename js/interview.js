(function () {
  const CATEGORIES_URL = '/data/categories.json';
  const cache = new Map();

  const state = {
    questions: [],
    interview: null,
    category: null,
    subcategory: null,
    currentIndex: 0,
    responses: {},
    revealed: {},
    checks: {},
    savedListController: null
  };

  const els = {
    breadcrumb: document.getElementById('breadcrumb'),
    title: document.getElementById('title'),
    subtitle: document.getElementById('subtitle'),
    shell: document.getElementById('questionShell'),
    progress: document.getElementById('progress'),
    questionTitle: document.getElementById('questionTitle'),
    questionText: document.getElementById('questionText'),
    questionBody: document.getElementById('questionBody'),
    checkBtn: document.getElementById('checkBtn'),
    toggleAnswerBtn: document.getElementById('toggleAnswerBtn'),
    bookmarkQuestionBtn: document.getElementById('bookmarkQuestionBtn'),
    checkResult: document.getElementById('checkResult'),
    answerBox: document.getElementById('answerBox'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    errorBox: document.getElementById('errorBox'),
    backToSub: document.getElementById('backToSub'),
    savedListOpenBtn: document.getElementById('savedListOpenBtn'),
    savedListModal: document.getElementById('savedListModal'),
    savedListCloseBtn: document.getElementById('savedListCloseBtn'),
    savedListContent: document.getElementById('savedListContent'),
    savedListClearBtn: document.getElementById('savedListClearBtn')
  };

  function esc(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function q(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function makeQuery(params) {
    const search = new URLSearchParams(params);
    return search.toString();
  }

  function setMetaByName(name, content) {
    const element = document.querySelector(`meta[name="${name}"]`);
    if (element) {
      element.setAttribute('content', content);
    }
  }

  function setMetaByProperty(property, content) {
    const element = document.querySelector(`meta[property="${property}"]`);
    if (element) {
      element.setAttribute('content', content);
    }
  }

  function setCanonical(url) {
    const canonical = document.getElementById('canonical-link');
    if (canonical) {
      canonical.setAttribute('href', url);
    }
  }

  function setSchema(schema) {
    const schemaEl = document.getElementById('seo-schema');
    if (schemaEl) {
      schemaEl.textContent = JSON.stringify(schema);
    }
  }

  function formatMultiline(text) {
    return esc(text || '').replace(/\n/g, '<br>');
  }

  function formatInline(text) {
    let value = esc(text || '');
    value = value.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    value = value.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    return value;
  }

  function startsCodeFence(line) {
    return /^\s*```/.test(line);
  }

  function startsHeading(line) {
    return /^\s*#{1,6}\s+/.test(line);
  }

  function startsList(line) {
    return /^\s*-\s+/.test(line);
  }

  function startsOrderedList(line) {
    return /^\s*\d+\.\s+/.test(line);
  }

  function startsQuote(line) {
    return /^\s*>\s?/.test(line);
  }

  function startsTable(lines, index) {
    const current = lines[index] || '';
    const next = lines[index + 1] || '';
    return current.includes('|') && /^\s*\|?[-:\s|]+\|?\s*$/.test(next);
  }

  function renderMarkdown(text) {
    if (!text) {
      return '';
    }

    const lines = String(text).replace(/\r/g, '').split('\n');
    let i = 0;
    let html = '';

    while (i < lines.length) {
      const line = lines[i];

      if (!line.trim()) {
        i += 1;
        continue;
      }

      if (startsCodeFence(line)) {
        i += 1;
        const codeLines = [];
        while (i < lines.length && !startsCodeFence(lines[i])) {
          codeLines.push(lines[i]);
          i += 1;
        }
        if (i < lines.length) {
          i += 1;
        }
        html += `<pre class="code"><code>${esc(codeLines.join('\n'))}</code></pre>`;
        continue;
      }

      if (startsTable(lines, i)) {
        const headerCells = lines[i]
          .split('|')
          .map((cell) => cell.trim())
          .filter(Boolean);
        i += 2; // skip header + separator

        const rows = [];
        while (i < lines.length && lines[i].includes('|') && lines[i].trim()) {
          const rowCells = lines[i]
            .split('|')
            .map((cell) => cell.trim())
            .filter(Boolean);
          if (rowCells.length > 0) {
            rows.push(rowCells);
          }
          i += 1;
        }

        const headerHtml = headerCells.map((cell) => `<th>${formatInline(cell)}</th>`).join('');
        const bodyHtml = rows.map((row) => {
          const rowHtml = row.map((cell) => `<td>${formatInline(cell)}</td>`).join('');
          return `<tr>${rowHtml}</tr>`;
        }).join('');

        html += `
          <div class="answer-table-wrap">
            <table class="answer-table">
              <thead><tr>${headerHtml}</tr></thead>
              <tbody>${bodyHtml}</tbody>
            </table>
          </div>
        `;
        continue;
      }

      if (startsHeading(line)) {
        const match = line.match(/^\s*(#{1,6})\s+(.*)$/);
        const level = Math.min(6, Math.max(2, match[1].length + 1));
        html += `<h${level} class="answer-heading">${formatInline(match[2])}</h${level}>`;
        i += 1;
        continue;
      }

      if (startsQuote(line)) {
        const quoteLines = [];
        while (i < lines.length && startsQuote(lines[i])) {
          quoteLines.push(lines[i].replace(/^\s*>\s?/, ''));
          i += 1;
        }
        let tone = 'debug';
        if (quoteLines.length > 0) {
          const marker = quoteLines[0].match(/^\s*\[(INFO|CONCEPT|CAUTION|SUCCESS|DEBUG)\]\s*/i);
          if (marker) {
            tone = marker[1].toLowerCase();
            quoteLines[0] = quoteLines[0].replace(/^\s*\[(INFO|CONCEPT|CAUTION|SUCCESS|DEBUG)\]\s*/i, '');
          }
        }
        html += `<div class="callout callout-${tone} answer-note"><p>${quoteLines.map((x) => formatInline(x)).join('<br>')}</p></div>`;
        continue;
      }

      if (startsList(line)) {
        const items = [];
        while (i < lines.length && startsList(lines[i])) {
          items.push(lines[i].replace(/^\s*-\s+/, ''));
          i += 1;
        }
        html += `<ul class="answer-list">${items.map((item) => `<li>${formatInline(item)}</li>`).join('')}</ul>`;
        continue;
      }

      if (startsOrderedList(line)) {
        const items = [];
        while (i < lines.length && startsOrderedList(lines[i])) {
          items.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
          i += 1;
        }
        html += `<ol class="answer-list">${items.map((item) => `<li>${formatInline(item)}</li>`).join('')}</ol>`;
        continue;
      }

      const paragraph = [];
      while (
        i < lines.length &&
        lines[i].trim() &&
        !startsCodeFence(lines[i]) &&
        !startsHeading(lines[i]) &&
        !startsQuote(lines[i]) &&
        !startsList(lines[i]) &&
        !startsOrderedList(lines[i]) &&
        !startsTable(lines, i)
      ) {
        paragraph.push(lines[i]);
        i += 1;
      }

      html += `<p>${paragraph.map((x) => formatInline(x)).join('<br>')}</p>`;
    }

    return html;
  }

  function setSeo({ title, description, path, robots = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' }) {
    const canonicalUrl = new URL(path, window.location.origin).href;

    document.title = title;
    setMetaByName('description', description);
    setMetaByName('robots', robots);
    setMetaByProperty('og:title', title);
    setMetaByProperty('og:description', description);
    setMetaByProperty('og:url', canonicalUrl);
    setMetaByName('twitter:title', title);
    setMetaByName('twitter:description', description);
    setCanonical(canonicalUrl);
    setSchema({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: canonicalUrl
    });
  }

  function sortByOrder(items) {
    return [...items].sort((a, b) => {
      const orderA = Number.isFinite(a?.order) ? a.order : Number.MAX_SAFE_INTEGER;
      const orderB = Number.isFinite(b?.order) ? b.order : Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return String(a?.title || '').localeCompare(String(b?.title || ''));
    });
  }

  async function fetchJson(url) {
    if (!url) {
      throw new Error('Data dosya yolu eksik.');
    }

    if (cache.has(url)) {
      return cache.get(url);
    }

    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`${url} okunamadi (HTTP ${response.status})`);
    }

    const data = await response.json();
    cache.set(url, data);
    return data;
  }

  async function loadCategories() {
    const data = await fetchJson(CATEGORIES_URL);
    return sortByOrder(data.categories || []);
  }

  async function loadSubcategories(category) {
    if (!category.subcategoriesFile) {
      throw new Error(`Kategori icin subcategoriesFile eksik: ${category.id}`);
    }
    const data = await fetchJson(category.subcategoriesFile);
    return sortByOrder(data.subcategories || []);
  }

  async function loadInterviewsIndex(subcategory) {
    if (!subcategory.interviewsFile) {
      throw new Error(`Alt kategori icin interviewsFile eksik: ${subcategory.id}`);
    }
    const data = await fetchJson(subcategory.interviewsFile);
    return sortByOrder(data.interviews || []);
  }

  async function loadInterview(interviewMeta) {
    if (!interviewMeta.file) {
      throw new Error(`Interview dosya yolu eksik: ${interviewMeta.id}`);
    }
    const interview = await fetchJson(interviewMeta.file);
    return {
      ...interviewMeta,
      ...interview
    };
  }

  function setError(message) {
    setSeo({
      title: 'Interview Player | Hata',
      description: message,
      path: '/interview.html',
      robots: 'noindex,nofollow'
    });
    els.errorBox.textContent = message;
    els.errorBox.classList.remove('hidden');
    els.shell.classList.add('hidden');
  }

  function setHeader() {
    const category = state.category;
    const sub = state.subcategory;
    const interview = state.interview;

    els.title.textContent = interview.title || 'Interview';
    els.subtitle.textContent = interview.description || '';

    const categoryLink = `/learn.html?${makeQuery({ category: category.id })}`;
    const subLink = `/learn.html?${makeQuery({ category: category.id, subcategory: sub.id })}`;

    els.breadcrumb.innerHTML = [
      `<a href="/learn.html">Ana Sayfa</a>`,
      `<a href="${categoryLink}">${esc(category.title)}</a>`,
      `<a href="${subLink}">${esc(sub.title)}</a>`,
      esc(interview.title || 'Interview')
    ].join(' / ');

    els.backToSub.href = subLink;

    setSeo({
      title: `${interview.title || 'Interview'} | ${sub.title} | Learning Hub`,
      description: interview.description || `${sub.title} interview sorulari`,
      path: `/interview.html?${makeQuery({
        category: category.id,
        subcategory: sub.id,
        interview: interview.id
      })}`
    });
  }

  function getSavedQuestionEntry(question) {
    return {
      categoryId: String(state.category?.id || ''),
      categoryTitle: String(state.category?.title || ''),
      subcategoryId: String(state.subcategory?.id || ''),
      subcategoryTitle: String(state.subcategory?.title || ''),
      interviewId: String(state.interview?.id || ''),
      interviewTitle: String(state.interview?.title || ''),
      questionId: String(question?.id || ''),
      questionText: String(question?.question || ''),
      questionOrder: state.currentIndex + 1
    };
  }

  function syncBookmarkButton(question) {
    if (!els.bookmarkQuestionBtn) {
      return;
    }

    if (!window.SavedQuestionList) {
      els.bookmarkQuestionBtn.classList.add('hidden');
      return;
    }

    const entry = getSavedQuestionEntry(question);
    const saved = window.SavedQuestionList.isSaved(entry);

    els.bookmarkQuestionBtn.textContent = saved ? 'Listeden Kaldir' : 'Listeye Ekle';
    els.bookmarkQuestionBtn.classList.toggle('btn-saved-active', saved);
  }

  function setupSavedListModal() {
    if (!window.SavedQuestionList) {
      return;
    }

    state.savedListController = window.SavedQuestionList.attachModal({
      openBtn: els.savedListOpenBtn,
      modal: els.savedListModal,
      closeBtn: els.savedListCloseBtn,
      contentEl: els.savedListContent,
      clearBtn: els.savedListClearBtn,
      onNavigate: (entry) => {
        if (!state.interview || !state.category || !state.subcategory) {
          return false;
        }

        const sameInterview = (
          String(entry.categoryId) === String(state.category.id) &&
          String(entry.subcategoryId) === String(state.subcategory.id) &&
          String(entry.interviewId) === String(state.interview.id)
        );

        if (!sameInterview) {
          return false;
        }

        const index = state.questions.findIndex((question) => String(question.id) === String(entry.questionId));
        if (index < 0) {
          return false;
        }

        state.currentIndex = index;
        renderQuestion();
        return true;
      },
      onAfterClear: () => {
        const current = state.questions[state.currentIndex];
        if (current) {
          syncBookmarkButton(current);
        }
      }
    });
  }

  function getQuestionState(question) {
    if (!state.responses[question.id]) {
      state.responses[question.id] = {
        selectedIds: [],
        codeInput: question.starterCode || ''
      };
    }
    return state.responses[question.id];
  }

  function renderMcq(question) {
    const qState = getQuestionState(question);
    const inputType = question.singleChoice === false ? 'checkbox' : 'radio';
    const inputName = `choice-${question.id}`;
    const codeBlock = question.questionCode
      ? `<pre class="code"><code>${esc(question.questionCode)}</code></pre>`
      : '';

    const choices = (question.choices || []).map((choice) => {
      const checked = qState.selectedIds.includes(choice.id) ? 'checked' : '';
      const inputId = `${question.id}-${choice.id}`;
      return `
        <div class="choice">
          <input
            id="${inputId}"
            type="${inputType}"
            name="${inputName}"
            value="${esc(choice.id)}"
            ${checked}
            data-choice-id="${esc(choice.id)}"
          >
          <label for="${inputId}">${esc(choice.text)}</label>
        </div>
      `;
    }).join('');

    els.questionBody.innerHTML = `
      ${codeBlock}
      <div class="choice-list">${choices}</div>
    `;

    Array.from(els.questionBody.querySelectorAll('input[data-choice-id]')).forEach((input) => {
      input.addEventListener('change', () => {
        const selected = Array.from(els.questionBody.querySelectorAll('input[data-choice-id]:checked'))
          .map((el) => el.getAttribute('data-choice-id'));
        qState.selectedIds = selected;
      });
    });
  }

  function renderCode(question) {
    const qState = getQuestionState(question);

    els.questionBody.innerHTML = `
      <label for="codeInput" class="badge">Kod Yazma Sorusu</label>
      <textarea id="codeInput" class="code-input" spellcheck="false">${esc(qState.codeInput)}</textarea>
    `;

    const codeInput = document.getElementById('codeInput');
    codeInput.addEventListener('input', () => {
      qState.codeInput = codeInput.value;
    });
  }

  function renderAnswer(question) {
    const revealed = Boolean(state.revealed[question.id]);

    if (!revealed) {
      els.answerBox.classList.add('hidden');
      els.toggleAnswerBtn.textContent = 'Cevabi Goster';
      return;
    }

    let html = '';

    if (question.type === 'mcq') {
      const correctIds = question.correctChoiceIds || [];
      const correctText = (question.choices || [])
        .filter((c) => correctIds.includes(c.id))
        .map((c) => c.text)
        .join(', ');

      html += `
        <div class="callout callout-success answer-highlight">
          <h4>Dogru Cevap</h4>
          <p><strong>Secenek:</strong> ${esc(correctIds.join(', ') || '-')}</p>
          <p><strong>Aciklama:</strong> ${esc(correctText || '-')}</p>
        </div>
      `;

      if (Array.isArray(question.optionExplanations) && question.optionExplanations.length > 0) {
        const items = question.optionExplanations.map((item) => {
          const isCorrect = correctIds.includes(item.id);
          const tone = isCorrect ? 'success' : 'caution';
          const status = isCorrect ? 'DOGRU' : 'YANLIS';
          return `
            <article class="callout callout-${tone} answer-option">
              <h4>Secenek ${esc(item.id)} - ${status}</h4>
              <div class="answer-rich">${renderMarkdown(item.text || '')}</div>
            </article>
          `;
        }).join('');
        html += `<div class="article-block"><h4>Sik Aciklamalari</h4><div class="answer-options">${items}</div></div>`;
      }
    }

    if (question.answerBody) {
      html += `<div class="article-block answer-rich">${renderMarkdown(question.answerBody)}</div>`;
    }

    if (question.answerCode) {
      html += `
        <div class="article-block">
          <h4>Referans Kod</h4>
          <pre class="code"><code>${esc(question.answerCode)}</code></pre>
        </div>
      `;
    }

    if (question.publicSolutionUrl) {
      html += `
        <div class="actions">
          <a class="btn" href="${esc(question.publicSolutionUrl)}" target="_blank" rel="noopener noreferrer">Public Cozume Git</a>
        </div>
      `;
    }

    els.answerBox.innerHTML = html || '<p>Cevap icerigi yok.</p>';
    els.answerBox.classList.remove('hidden');
    els.toggleAnswerBtn.textContent = 'Cevabi Gizle';
  }

  function checkCurrentAnswer(question) {
    if (question.type !== 'mcq') {
      state.checks[question.id] = {
        text: 'Kod sorularinda otomatik kontrol yok. Cevabi gostere basabilirsin.',
        ok: true
      };
      return;
    }

    const qState = getQuestionState(question);
    const selected = [...(qState.selectedIds || [])].sort();
    const correct = [...(question.correctChoiceIds || [])].sort();

    const sameLength = selected.length === correct.length;
    const sameValues = sameLength && selected.every((id, idx) => id === correct[idx]);

    state.checks[question.id] = sameValues
      ? { text: 'Dogru.', ok: true }
      : { text: 'Yanlis. Cevabi Goster ile dogrusunu gorebilirsin.', ok: false };
  }

  function renderCheckResult(question) {
    const result = state.checks[question.id];
    if (!result) {
      els.checkResult.innerHTML = '';
      return;
    }

    const css = result.ok ? 'status-ok' : 'status-bad';
    els.checkResult.innerHTML = `<p class="${css}">${esc(result.text)}</p>`;
  }

  function hasDetailedAnswer(question) {
    return Boolean(
      String(question?.answerBody || '').trim() ||
      String(question?.answerCode || '').trim()
    );
  }

  function getQuestionTitle(question) {
    if (question.type === 'code') {
      return 'Kod Yazma Sorusu';
    }
    if (question.questionKind === 'code-output') {
      return 'Kod Ciktisi Sorusu';
    }
    return 'Kavramsal Test Sorusu';
  }

  function renderQuestion() {
    const question = state.questions[state.currentIndex];
    if (!question) {
      setError('Soru bulunamadi.');
      return;
    }

    els.shell.classList.remove('hidden');
    els.errorBox.classList.add('hidden');

    els.progress.textContent = `Soru ${state.currentIndex + 1} / ${state.questions.length}`;
    const title = getQuestionTitle(question);
    if (hasDetailedAnswer(question)) {
      els.questionTitle.innerHTML = `${esc(title)} <span class="answer-tag">Cevap Var</span>`;
    } else {
      els.questionTitle.textContent = title;
    }
    els.questionText.textContent = question.question || '';
    els.checkResult.innerHTML = '';

    if (question.type === 'mcq') {
      els.checkBtn.classList.remove('hidden');
      renderMcq(question);
    } else {
      els.checkBtn.classList.remove('hidden');
      renderCode(question);
    }

    renderCheckResult(question);
    renderAnswer(question);
    syncBookmarkButton(question);

    els.prevBtn.disabled = state.currentIndex === 0;
    els.nextBtn.disabled = state.currentIndex >= state.questions.length - 1;
  }

  function bindEvents() {
    els.prevBtn.addEventListener('click', () => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        renderQuestion();
      }
    });

    els.nextBtn.addEventListener('click', () => {
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex += 1;
        renderQuestion();
      }
    });

    els.checkBtn.addEventListener('click', () => {
      const question = state.questions[state.currentIndex];
      checkCurrentAnswer(question);
      renderCheckResult(question);
    });

    els.toggleAnswerBtn.addEventListener('click', () => {
      const question = state.questions[state.currentIndex];
      state.revealed[question.id] = !state.revealed[question.id];
      renderAnswer(question);
    });

    if (els.bookmarkQuestionBtn) {
      els.bookmarkQuestionBtn.addEventListener('click', () => {
        const question = state.questions[state.currentIndex];
        if (!question || !window.SavedQuestionList) {
          return;
        }

        const entry = getSavedQuestionEntry(question);
        const saved = window.SavedQuestionList.isSaved(entry);

        if (saved) {
          window.SavedQuestionList.remove(entry);
        } else {
          window.SavedQuestionList.add(entry);
        }

        syncBookmarkButton(question);
        if (state.savedListController) {
          state.savedListController.refresh();
        }
      });
    }
  }

  async function init() {
    bindEvents();
    setupSavedListModal();

    try {
      const categoryId = q('category');
      const subcategoryId = q('subcategory');
      const interviewId = q('interview');
      const questionId = q('question');

      if (!categoryId || !subcategoryId || !interviewId) {
        throw new Error('Eksik query parametresi.');
      }

      const categories = await loadCategories();
      const category = categories.find((item) => item.id === categoryId);
      if (!category) {
        throw new Error('Kategori bulunamadi.');
      }

      const subcategories = await loadSubcategories(category);
      const subcategory = subcategories.find((item) => item.id === subcategoryId);
      if (!subcategory) {
        throw new Error('Alt kategori bulunamadi.');
      }

      const interviews = await loadInterviewsIndex(subcategory);
      const interviewMeta = interviews.find((item) => item.id === interviewId);
      if (!interviewMeta) {
        throw new Error('Interview bulunamadi.');
      }

      const interview = await loadInterview(interviewMeta);
      const questions = interview.questions || [];
      if (questions.length === 0) {
        throw new Error('Bu interview icin soru yok.');
      }

      state.category = category;
      state.subcategory = subcategory;
      state.interview = interview;
      state.questions = questions;
      state.currentIndex = 0;

      if (questionId) {
        const targetIndex = questions.findIndex((question) => String(question.id) === String(questionId));
        if (targetIndex >= 0) {
          state.currentIndex = targetIndex;
        }
      }

      setHeader();
      renderQuestion();
    } catch (error) {
      setError(error.message || 'Beklenmeyen hata.');
    }
  }

  init();
})();
