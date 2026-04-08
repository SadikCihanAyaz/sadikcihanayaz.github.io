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
    checks: {}
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
    checkResult: document.getElementById('checkResult'),
    answerBox: document.getElementById('answerBox'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    errorBox: document.getElementById('errorBox'),
    backToSub: document.getElementById('backToSub')
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

    els.questionBody.innerHTML = `<div class="choice-list">${choices}</div>`;

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

      html += `<p><strong>Dogru cevap:</strong> ${esc(correctText || '-')}</p>`;
    }

    if (question.answerBody) {
      html += `<p>${esc(question.answerBody)}</p>`;
    }

    if (question.answerCode) {
      html += `<pre class="code"><code>${esc(question.answerCode)}</code></pre>`;
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

  function renderQuestion() {
    const question = state.questions[state.currentIndex];
    if (!question) {
      setError('Soru bulunamadi.');
      return;
    }

    els.shell.classList.remove('hidden');
    els.errorBox.classList.add('hidden');

    els.progress.textContent = `Soru ${state.currentIndex + 1} / ${state.questions.length}`;
    els.questionTitle.textContent = question.type === 'code' ? 'Kod Sorusu' : 'Test Sorusu';
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
  }

  async function init() {
    bindEvents();

    try {
      const categoryId = q('category');
      const subcategoryId = q('subcategory');
      const interviewId = q('interview');

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

      setHeader();
      renderQuestion();
    } catch (error) {
      setError(error.message || 'Beklenmeyen hata.');
    }
  }

  init();
})();
