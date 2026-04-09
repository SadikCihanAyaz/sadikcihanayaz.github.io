(function () {
  const CATEGORIES_URL = '/data/categories.json';
  const cache = new Map();

  const els = {
    breadcrumb: document.getElementById('breadcrumb'),
    title: document.getElementById('title'),
    subtitle: document.getElementById('subtitle'),
    app: document.getElementById('app')
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

  function link(label, href) {
    return `<a href="${href}">${esc(label)}</a>`;
  }

  function setBreadcrumb(parts) {
    els.breadcrumb.innerHTML = parts.filter(Boolean).join(' / ');
  }

  function setTitle(title, subtitle) {
    els.title.textContent = title;
    els.subtitle.textContent = subtitle || '';
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
      '@type': 'CollectionPage',
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

  async function loadTopic(subcategory) {
    if (!subcategory.topicFile) {
      throw new Error(`Alt kategori icin topicFile eksik: ${subcategory.id}`);
    }
    return fetchJson(subcategory.topicFile);
  }

  async function loadInterviews(subcategory) {
    if (!subcategory.interviewsFile) {
      throw new Error(`Alt kategori icin interviewsFile eksik: ${subcategory.id}`);
    }
    const data = await fetchJson(subcategory.interviewsFile);
    return sortByOrder(data.interviews || []);
  }

  function renderCategoryList(categories) {
    setBreadcrumb([link('Ana Sayfa', '/learn.html')]);
    setTitle('Kategoriler', 'Bir kategori secerek devam et.');
    setSeo({
      title: 'Learning Hub | Kategoriler',
      description: 'Teknik konulari kategori bazli kesfet ve ilgili alt kategorilere gec.',
      path: '/learn.html'
    });

    const cards = categories.map((category) => {
      const href = `/learn.html?${makeQuery({ category: category.id })}`;
      const subCount = category.subcategoryCount ?? 0;

      return `
        <article class="card">
          <h3>${esc(category.title)}</h3>
          <p>${esc(category.description || '')}</p>
          <div class="meta">${esc(subCount)} alt kategori</div>
          <div class="actions">
            <a class="btn btn-primary" href="${href}">Ac</a>
          </div>
        </article>
      `;
    }).join('');

    els.app.innerHTML = `<div class="grid">${cards || '<p>Kategori bulunamadi.</p>'}</div>`;
  }

  function renderSubcategoryList(category, subcategories) {
    setBreadcrumb([
      link('Ana Sayfa', '/learn.html'),
      esc(category.title)
    ]);

    setTitle(`${category.title} Alt Kategorileri`, 'Bir alt kategori sec.');
    setSeo({
      title: `${category.title} Alt Kategorileri | Learning Hub`,
      description: `${category.title} kategorisindeki alt basliklari ve interview iceriklerini incele.`,
      path: `/learn.html?${makeQuery({ category: category.id })}`
    });

    const cards = subcategories.map((sub) => {
      const href = `/learn.html?${makeQuery({ category: category.id, subcategory: sub.id })}`;
      const interviewCount = sub.interviewCount ?? 0;

      return `
        <article class="card">
          <h3>${esc(sub.title)}</h3>
          <p>${esc(sub.description || '')}</p>
          <div class="meta">1 Konu anlatimi + ${esc(interviewCount)} interview</div>
          <div class="actions">
            <a class="btn btn-primary" href="${href}">Gir</a>
          </div>
        </article>
      `;
    }).join('');

    els.app.innerHTML = `<div class="grid">${cards || '<p>Alt kategori bulunamadi.</p>'}</div>`;
  }

  function renderSubcategoryHome(category, subcategory, topic, interviews) {
    setBreadcrumb([
      link('Ana Sayfa', '/learn.html'),
      link(category.title, `/learn.html?${makeQuery({ category: category.id })}`),
      esc(subcategory.title)
    ]);

    setTitle(`${subcategory.title}`, 'Bu alt kategoride once konu anlatimi, sonra interview listesi gelir.');
    setSeo({
      title: `${subcategory.title} | Learning Hub`,
      description: `${subcategory.title} icin konu anlatimi ve interview listesi.`,
      path: `/learn.html?${makeQuery({ category: category.id, subcategory: subcategory.id })}`
    });

    const topicHref = `/learn.html?${makeQuery({
      category: category.id,
      subcategory: subcategory.id,
      view: 'topic'
    })}`;

    const topicCard = `
      <article class="card">
        <span class="badge">Konu Anlatimi</span>
        <h3>${esc(topic?.title || 'Konu Anlatimi')}</h3>
        <p>${esc(subcategory.description || '')}</p>
        <div class="actions">
          <a class="btn btn-primary" href="${topicHref}">Konuya Gir</a>
        </div>
      </article>
    `;

    const interviewCards = interviews.map((interview, index) => {
      const href = `/interview.html?${makeQuery({
        category: category.id,
        subcategory: subcategory.id,
        interview: interview.id
      })}`;

      return `
        <article class="card">
          <span class="badge">Interview ${index + 1}</span>
          <h3>${esc(interview.title)}</h3>
          <p>${esc(interview.description || '')}</p>
          <div class="meta">${esc(interview.questionCount ?? 0)} soru</div>
          <div class="actions">
            <a class="btn btn-primary" href="${href}">Interview'e Basla</a>
          </div>
        </article>
      `;
    }).join('');

    els.app.innerHTML = `
      <section class="section">
        <h2>1) Konu</h2>
        <div class="grid">${topicCard}</div>
      </section>
      <section class="section">
        <h2>2) Interview'ler</h2>
        <div class="grid">${interviewCards || '<p>Interview bulunamadi.</p>'}</div>
      </section>
    `;
  }

  function renderTopic(category, subcategory, article) {
    setBreadcrumb([
      link('Ana Sayfa', '/learn.html'),
      link(category.title, `/learn.html?${makeQuery({ category: category.id })}`),
      link(subcategory.title, `/learn.html?${makeQuery({ category: category.id, subcategory: subcategory.id })}`),
      'Konu Anlatimi'
    ]);

    setTitle(article.title || `${subcategory.title} - Konu Anlatimi`, subcategory.description || '');
    setSeo({
      title: `${article.title || `${subcategory.title} Konu Anlatimi`} | Learning Hub`,
      description: subcategory.description || `${subcategory.title} konu anlatimi.`,
      path: `/learn.html?${makeQuery({ category: category.id, subcategory: subcategory.id, view: 'topic' })}`
    });

    const blocks = (article.blocks || []).map((block) => {
      if (block.type === 'paragraph') {
        return `<div class="article-block"><p>${esc(block.text)}</p></div>`;
      }

      if (block.type === 'list') {
        const items = (block.items || []).map((item) => `<li>${esc(item)}</li>`).join('');
        return `
          <div class="article-block">
            ${block.title ? `<h4>${esc(block.title)}</h4>` : ''}
            <ul>${items}</ul>
          </div>
        `;
      }

      if (block.type === 'code') {
        return `
          <div class="article-block">
            <h4>${esc((block.language || 'code').toUpperCase())}</h4>
            <pre class="code"><code>${esc(block.code || '')}</code></pre>
          </div>
        `;
      }

      if (block.type === 'callout') {
        const toneRaw = String(block.tone || 'info').toLowerCase();
        const tone = /^[a-z0-9-]+$/.test(toneRaw) ? toneRaw : 'info';
        const items = Array.isArray(block.items)
          ? block.items.map((item) => `<li>${esc(item)}</li>`).join('')
          : '';

        return `
          <div class="article-block callout callout-${tone}">
            ${block.title ? `<h4>${esc(block.title)}</h4>` : ''}
            ${block.text ? `<p>${esc(block.text)}</p>` : ''}
            ${items ? `<ul>${items}</ul>` : ''}
            ${block.code ? `<pre class="code"><code>${esc(block.code)}</code></pre>` : ''}
          </div>
        `;
      }

      return '';
    }).join('');

    els.app.innerHTML = `
      <article class="card">
        ${blocks || '<p>Bu konuda icerik yok.</p>'}
        <div class="actions">
          <a class="btn" href="/learn.html?${makeQuery({ category: category.id, subcategory: subcategory.id })}">Interview Listesine Don</a>
        </div>
      </article>
    `;
  }

  function renderError(message) {
    setBreadcrumb([link('Ana Sayfa', '/learn.html')]);
    setTitle('Hata', 'Icerik yuklenemedi.');
    setSeo({
      title: 'Learning Hub | Hata',
      description: message,
      path: '/learn.html',
      robots: 'noindex,nofollow'
    });
    els.app.innerHTML = `<div class="callout">${esc(message)}</div>`;
  }

  async function init() {
    try {
      const categoryId = q('category');
      const subcategoryId = q('subcategory');
      const view = q('view');

      const categories = await loadCategories();

      if (!categoryId) {
        renderCategoryList(categories);
        return;
      }

      const category = categories.find((item) => item.id === categoryId);
      if (!category) {
        renderError('Kategori bulunamadi.');
        return;
      }

      const subcategories = await loadSubcategories(category);

      if (!subcategoryId) {
        renderSubcategoryList(category, subcategories);
        return;
      }

      const subcategory = subcategories.find((item) => item.id === subcategoryId);
      if (!subcategory) {
        renderError('Alt kategori bulunamadi.');
        return;
      }

      if (view === 'topic') {
        const article = await loadTopic(subcategory);
        renderTopic(category, subcategory, article);
        return;
      }

      const [topic, interviews] = await Promise.all([
        loadTopic(subcategory),
        loadInterviews(subcategory)
      ]);
      renderSubcategoryHome(category, subcategory, topic, interviews);
    } catch (error) {
      renderError(error.message || 'Beklenmeyen bir hata olustu.');
    }
  }

  init();
})();
