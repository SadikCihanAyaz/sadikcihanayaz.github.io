(function () {
  const STORAGE_KEY = 'learningHubSavedQuestions';

  function esc(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalizeId(value) {
    return String(value ?? '').trim();
  }

  function makeKey(item) {
    return [
      normalizeId(item.categoryId),
      normalizeId(item.subcategoryId),
      normalizeId(item.interviewId),
      normalizeId(item.questionId)
    ].join('::');
  }

  function readList() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function writeList(list) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return true;
    } catch (error) {
      return false;
    }
  }

  function normalizeItem(item) {
    if (!item) {
      return null;
    }

    const normalized = {
      categoryId: normalizeId(item.categoryId),
      categoryTitle: String(item.categoryTitle || ''),
      subcategoryId: normalizeId(item.subcategoryId),
      subcategoryTitle: String(item.subcategoryTitle || ''),
      interviewId: normalizeId(item.interviewId),
      interviewTitle: String(item.interviewTitle || ''),
      questionId: normalizeId(item.questionId),
      questionText: String(item.questionText || ''),
      questionOrder: Number.isFinite(item.questionOrder) ? item.questionOrder : null,
      savedAt: Number(item.savedAt) || Date.now()
    };

    if (!normalized.categoryId || !normalized.subcategoryId || !normalized.interviewId || !normalized.questionId) {
      return null;
    }

    normalized.key = makeKey(normalized);
    return normalized;
  }

  function getAll() {
    return readList().sort((a, b) => Number(b.savedAt || 0) - Number(a.savedAt || 0));
  }

  function isSaved(itemOrKey) {
    const key = typeof itemOrKey === 'string' ? itemOrKey : makeKey(itemOrKey || {});
    if (!key || key === '::::') {
      return false;
    }
    return readList().some((item) => item.key === key);
  }

  function add(item) {
    const normalized = normalizeItem(item);
    if (!normalized) {
      return false;
    }

    const list = readList();
    const index = list.findIndex((entry) => entry.key === normalized.key);

    if (index >= 0) {
      list[index] = {
        ...list[index],
        ...normalized
      };
    } else {
      list.push(normalized);
    }

    return writeList(list);
  }

  function remove(itemOrKey) {
    const key = typeof itemOrKey === 'string' ? itemOrKey : makeKey(itemOrKey || {});
    if (!key || key === '::::') {
      return false;
    }

    const list = readList();
    const next = list.filter((item) => item.key !== key);

    if (next.length === list.length) {
      return false;
    }

    return writeList(next);
  }

  function clear() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      return false;
    }
  }

  function buildQuestionUrl(item) {
    const params = new URLSearchParams({
      category: item.categoryId,
      subcategory: item.subcategoryId,
      interview: item.interviewId,
      question: item.questionId
    });
    return `/interview.html?${params.toString()}`;
  }

  function buildSubcategoryKey(item) {
    return [
      normalizeId(item?.categoryId),
      normalizeId(item?.subcategoryId)
    ].join('::');
  }

  function groupBySubcategory(items) {
    const map = new Map();

    for (const item of items) {
      const key = buildSubcategoryKey(item);
      if (!key || key === '::') {
        continue;
      }

      if (!map.has(key)) {
        map.set(key, {
          key,
          categoryId: normalizeId(item.categoryId),
          categoryTitle: String(item.categoryTitle || item.categoryId || ''),
          subcategoryId: normalizeId(item.subcategoryId),
          subcategoryTitle: String(item.subcategoryTitle || item.subcategoryId || ''),
          items: []
        });
      }

      map.get(key).items.push(item);
    }

    return [...map.values()]
      .map((group) => ({
        ...group,
        count: group.items.length,
        label: `${group.categoryTitle} - ${group.subcategoryTitle}`
      }))
      .sort((a, b) => {
        if (b.count !== a.count) {
          return b.count - a.count;
        }
        return a.label.localeCompare(b.label);
      });
  }

  function attachModal(options) {
    const openBtn = options?.openBtn;
    const modal = options?.modal;
    const closeBtn = options?.closeBtn;
    const contentEl = options?.contentEl;
    const clearBtn = options?.clearBtn;
    const onNavigate = options?.onNavigate;
    const onAfterClear = options?.onAfterClear;

    if (!openBtn || !modal || !contentEl) {
      return {
        open() {},
        close() {},
        refresh() {}
      };
    }

    const viewState = {
      mode: 'groups',
      selectedGroupKey: ''
    };

    function resetViewState() {
      viewState.mode = 'groups';
      viewState.selectedGroupKey = '';
    }

    function closeModal() {
      resetViewState();
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    }

    function renderGroupList(list) {
      const groups = groupBySubcategory(list);
      if (groups.length === 0) {
        contentEl.innerHTML = '<p class="saved-empty">Listede soru yok.</p>';
        return;
      }

      const rows = groups.map((group) => `
        <li>
          <button type="button" class="saved-item saved-group-item" data-group-key="${esc(group.key)}">
            <div class="saved-item-title">
              ${esc(group.categoryTitle)} - ${esc(group.subcategoryTitle)}
              <span class="saved-group-count">(${esc(group.count)})</span>
            </div>
          </button>
        </li>
      `).join('');

      contentEl.innerHTML = `<ul class="saved-list">${rows}</ul>`;

      Array.from(contentEl.querySelectorAll('.saved-group-item')).forEach((button) => {
        button.addEventListener('click', () => {
          const groupKey = String(button.getAttribute('data-group-key') || '');
          if (!groupKey) {
            return;
          }
          viewState.mode = 'items';
          viewState.selectedGroupKey = groupKey;
          renderList();
        });
      });
    }

    function renderGroupItems(list) {
      const groups = groupBySubcategory(list);
      const group = groups.find((item) => item.key === viewState.selectedGroupKey);
      if (!group) {
        resetViewState();
        renderList();
        return;
      }

      const rows = group.items.map((item) => `
        <li>
          <button type="button" class="saved-item saved-question-item" data-key="${esc(item.key)}">
            <div class="saved-item-title">${esc(item.questionText || item.questionId)}</div>
            <div class="saved-item-meta">
              ${esc(item.interviewTitle)} - ${esc(item.questionId)}
            </div>
          </button>
        </li>
      `).join('');

      contentEl.innerHTML = `
        <div class="saved-subheader">
          <button type="button" class="btn saved-back-btn" id="savedListBackBtn">Geri</button>
          <div class="saved-subtitle">${esc(group.categoryTitle)} - ${esc(group.subcategoryTitle)} (${esc(group.count)})</div>
        </div>
        <ul class="saved-list">${rows}</ul>
      `;

      const backBtn = document.getElementById('savedListBackBtn');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          resetViewState();
          renderList();
        });
      }

      Array.from(contentEl.querySelectorAll('.saved-question-item')).forEach((button) => {
        button.addEventListener('click', () => {
          const key = button.getAttribute('data-key');
          const entry = group.items.find((item) => item.key === key);
          if (!entry) {
            return;
          }
          const handled = typeof onNavigate === 'function' ? Boolean(onNavigate(entry)) : false;
          if (!handled) {
            window.location.href = buildQuestionUrl(entry);
            return;
          }

          closeModal();
        });
      });
    }

    function renderList() {
      const list = getAll();
      if (clearBtn) {
        clearBtn.disabled = list.length === 0;
      }

      if (list.length === 0) {
        resetViewState();
        contentEl.innerHTML = '<p class="saved-empty">Listede soru yok.</p>';
        return;
      }

      if (viewState.mode === 'items') {
        renderGroupItems(list);
        return;
      }

      renderGroupList(list);
    }

    function openModal() {
      resetViewState();
      renderList();
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
    }

    openBtn.addEventListener('click', openModal);

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.hasAttribute('data-close-saved-list')) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (getAll().length === 0) {
          return;
        }

        const confirmed = window.confirm('Liste tamamen temizlensin mi?');
        if (!confirmed) {
          return;
        }

        clear();
        resetViewState();
        renderList();
        if (typeof onAfterClear === 'function') {
          onAfterClear();
        }
      });
    }

    return {
      open: openModal,
      close: closeModal,
      refresh: renderList
    };
  }

  window.SavedQuestionList = {
    makeKey,
    getAll,
    isSaved,
    add,
    remove,
    clear,
    buildQuestionUrl,
    attachModal
  };
})();
