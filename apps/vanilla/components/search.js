import { buildSearchIndex, isSearchItemLocked, normalizeSearchText, rankSearchItem } from '../utils/search.js';
import { setNavbarOpen } from './navbar.js';


export function renderSearch (containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
    <div class="search-box">
      <i data-lucide="search" aria-hidden="true"></i>
      <input
        type="search"
        class="search-box__input"
        placeholder="Buscar rutas, módulos o pasos..."
        autocomplete="off"
        aria-label="Buscar en las rutas"
        aria-expanded="false"
        aria-controls="search-results"
      />
      <button type="button" class="search-box__button" aria-label="Abrir primer resultado">
        Buscar
      </button>
      <div class="search-results" id="search-results" role="listbox" hidden></div>
    </div>
  `;

    const input = container.querySelector('.search-box__input');
    const button = container.querySelector('.search-box__button');
    const resultsBox = container.querySelector('.search-results');
    const searchIndex = buildSearchIndex();
    let results = [];
    let activeIndex = -1;

    function closeResults() {
        resultsBox.hidden = true;
        input.setAttribute('aria-expanded', 'false');
        activeIndex = -1;
    }

    function moveActiveResult(direction) {
        const links = Array.from(resultsBox.querySelectorAll('[data-result-index]'));
        if (!links.length) return;

        const currentPosition = links.findIndex(
            (link) => Number(link.getAttribute('data-result-index')) === activeIndex
        );
        const nextPosition = (currentPosition + direction + links.length) % links.length;
        activeIndex = Number(links[nextPosition].getAttribute('data-result-index'));
        links.forEach((link, itemIndex) => {
            link.classList.toggle('search-results__item--active', itemIndex === nextPosition);
        });
        links[nextPosition].scrollIntoView({ block: 'nearest' });
    }

    function openResult(item) {
        if (!item || isSearchItemLocked(item)) return;
        closeResults();
        input.value = '';
        window.location.hash = item.href;
        if (typeof setNavbarOpen === 'function') {
            setNavbarOpen(false);
        }
    }

    function renderResults() {
        const query = normalizeSearchText(input.value);
        activeIndex = -1;

        if (query.length < 2) {
            closeResults();
            return;
        }

        results = searchIndex
            .map((item) => ({ item: item, score: rankSearchItem(item, query) }))
            .filter((result) => result.score >= 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 8)
            .map((result) => result.item);

        resultsBox.innerHTML = results.length
            ? results.map((item, index) => {
                const locked = isSearchItemLocked(item);
                const tag = locked ? 'span' : 'a';
                const attributes = locked
                    ? 'aria-disabled="true"'
                    : `href="${item.href}" data-result-index="${index}"`;
                return `
              <${tag}
                class="search-results__item${locked ? ' search-results__item--locked' : ''}"
                role="option"
                ${attributes}
              >
                <span class="search-results__mark ${item.icon}" aria-hidden="true"></span>
                <span class="search-results__body">
                  <strong>${item.label}</strong>
                  <small>${item.context}</small>
                </span>
                <span class="search-results__type">${locked ? 'Bloqueado' : item.type}</span>
              </${tag}>
            `;
            }).join('')
            : '<p class="search-results__empty">No encontramos coincidencias en las rutas publicadas.</p>';

        resultsBox.hidden = false;
        input.setAttribute('aria-expanded', 'true');
    }

    function openFirstResult() {
        const firstAvailable = results.find((item) => !isSearchItemLocked(item));
        openResult(activeIndex >= 0 ? results[activeIndex] : firstAvailable);
    }

    input.addEventListener('input', renderResults);
    input.addEventListener('focus', renderResults);
    button.addEventListener('click', openFirstResult);
    input.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            moveActiveResult(1);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            moveActiveResult(-1);
        } else if (event.key === 'Enter') {
            event.preventDefault();
            openFirstResult();
        } else if (event.key === 'Escape') {
            closeResults();
        }
    });

    resultsBox.addEventListener('click', (event) => {
        const link = event.target.closest('[data-result-index]');
        if (!link) return;
        event.preventDefault();
        openResult(results[Number(link.getAttribute('data-result-index'))]);
    });

    document.addEventListener('click', (event) => {
        if (!container.contains(event.target)) closeResults();
    });
};
