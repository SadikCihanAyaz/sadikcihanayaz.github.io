(function () {
  const INDEX_URL = '/data/search-index.json';
  const MIN_QUERY_LENGTH = 4;
  const MAX_RESULTS = 30;
  const INPUT_DEBOUNCE_MS = 260;

  const root = document.getElementById('globalSearch');
  const input = document.getElementById('globalSearchInput');
  const resultsEl = document.getElementById('globalSearchResults');

  if (!root || !input || !resultsEl) {
    return;
  }

  const state = {
    items: null,
    loadingPromise: null,
    querySeq: 0,
    debounceTimer: null
  };

  function esc(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalize(text) {
    return String(text || '')
      .replace(/[ıİ]/g, 'i')
      .replace(/[ğĞ]/g, 'g')
      .replace(/[şŞ]/g, 's')
      .replace(/[çÇ]/g, 'c')
      .replace(/[öÖ]/g, 'o')
      .replace(/[üÜ]/g, 'u')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function openResults() {
    resultsEl.classList.remove('hidden');
  }

  function closeResults() {
    resultsEl.classList.add('hidden');
  }

  function renderMessage(message) {
    resultsEl.innerHTML = `<p class="search-result-empty">${esc(message)}</p>`;
    openResults();
  }

  async function loadIndex() {
    if (Array.isArray(state.items)) {
      return state.items;
    }

    if (state.loadingPromise) {
      return state.loadingPromise;
    }

    state.loadingPromise = fetch(INDEX_URL, { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Search index okunamadi (HTTP ${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        const items = Array.isArray(data?.items) ? data.items : [];
        state.items = items
          .map((item) => ({
            ...item,
            titleNorm: normalize(item.title),
            search: String(item.search || ''),
            url: String(item.url || '#')
          }))
          .filter((item) => item.search && item.url && item.title);
        return state.items;
      })
      .catch(() => {
        state.items = [];
        return state.items;
      })
      .finally(() => {
        state.loadingPromise = null;
      });

    return state.loadingPromise;
  }

  function scoreItem(item, normalizedQuery, tokens) {
    let score = 0;
    const title = item.titleNorm || '';
    const search = item.search || '';

    if (title.startsWith(normalizedQuery)) {
      score += 120;
    }
    if (title.includes(normalizedQuery)) {
      score += 70;
    }
    if (search.includes(normalizedQuery)) {
      score += 35;
    }

    for (const token of tokens) {
      if (title.startsWith(token)) {
        score += 26;
      } else if (title.includes(token)) {
        score += 16;
      }

      if (search.includes(token)) {
        score += 8;
      }
    }

    if (item.kind === 'question') {
      score += 6;
    }

    return score;
  }

  function findMatches(items, normalizedQuery) {
    const tokens = normalizedQuery.split(' ').filter(Boolean);
    const scored = [];

    for (const item of items) {
      const haystack = item.search || '';
      if (!haystack) {
        continue;
      }

      let matched = haystack.includes(normalizedQuery);
      if (!matched && tokens.length > 1) {
        matched = tokens.every((token) => haystack.includes(token));
      }

      if (!matched) {
        continue;
      }

      scored.push({
        item,
        score: scoreItem(item, normalizedQuery, tokens)
      });
    }

    scored.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return String(a.item.title || '').localeCompare(String(b.item.title || ''));
    });

    const total = scored.length;
    return {
      total,
      tooMany: total > MAX_RESULTS,
      items: scored.slice(0, MAX_RESULTS).map((entry) => entry.item)
    };
  }

  function renderResults(query, result) {
    if (!result || result.total === 0) {
      renderMessage(`"${query}" icin sonuc bulunamadi.`);
      return;
    }

    const headText = result.tooMany
      ? `${result.total} sonuc bulundu. Ilk ${MAX_RESULTS} sonuc gosteriliyor, aramayi daralt.`
      : `${result.total} sonuc bulundu.`;

    const rows = result.items.map((item) => {
      const title = esc(item.title || 'Sonuc');
      const meta = esc(item.meta || '');
      const url = esc(item.url || '#');
      return `
        <li>
          <a class="search-result-item" href="${url}">
            <div class="search-result-title">${title}</div>
            <div class="search-result-meta">${meta}</div>
          </a>
        </li>
      `;
    }).join('');

    resultsEl.innerHTML = `
      <div class="search-results-head">${esc(headText)}</div>
      <ul class="search-results-list">${rows}</ul>
    `;

    openResults();
  }

  async function runSearch() {
    const rawQuery = String(input.value || '').trim();
    const normalizedQuery = normalize(rawQuery);
    const seq = ++state.querySeq;

    if (!rawQuery) {
      closeResults();
      return;
    }

    if (normalizedQuery.length < MIN_QUERY_LENGTH) {
      renderMessage(`Arama icin en az ${MIN_QUERY_LENGTH} karakter gir.`);
      return;
    }

    renderMessage('Arama yapiliyor...');
    const items = await loadIndex();

    if (seq !== state.querySeq) {
      return;
    }

    if (!items || items.length === 0) {
      renderMessage('Arama dizini yuklenemedi. Lutfen sayfayi yenile.');
      return;
    }

    const result = findMatches(items, normalizedQuery);
    renderResults(rawQuery, result);
  }

  function scheduleSearch() {
    if (state.debounceTimer) {
      window.clearTimeout(state.debounceTimer);
    }

    state.debounceTimer = window.setTimeout(runSearch, INPUT_DEBOUNCE_MS);
  }

  input.addEventListener('input', scheduleSearch);

  input.addEventListener('focus', () => {
    if (String(input.value || '').trim()) {
      scheduleSearch();
    }
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeResults();
      return;
    }

    if (event.key === 'Enter') {
      const firstResult = resultsEl.querySelector('.search-result-item');
      if (firstResult instanceof HTMLAnchorElement) {
        event.preventDefault();
        window.location.href = firstResult.href;
      }
    }
  });

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Node)) {
      return;
    }

    if (!root.contains(event.target)) {
      closeResults();
    }
  });
})();
