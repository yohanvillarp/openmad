import { getGraphProgress } from '../utils/progress-graph.js';


const PROGRESS_ITEMS = [
    { icon: 'icon-ruta', key: 'rutas', label: 'rutas' },
    { icon: 'icon-modulo', key: 'modulos', label: 'módulos' },
    { icon: 'icon-paso', key: 'pasos', label: 'pasos' },
    { key: 'xp', label: 'XP', kind: 'xp' }
];

function progressMarkup(progress) {
    return PROGRESS_ITEMS.map((item) => {
        const stat = progress[item.key] || { done: 0, total: 0 };
        const mark = item.kind === 'xp'
            ? '<span class="graph-progress__xp" aria-hidden="true">XP</span>'
            : `<span class="${item.icon}" aria-hidden="true"></span>`;
        return `
          <span class="graph-progress__item" data-progress-key="${item.key}" title="${stat.done} de ${stat.total} ${item.label}">
            ${mark}
            <span class="graph-progress__count">${stat.done}/${stat.total}</span>
            <span class="visually-hidden">${item.label}</span>
          </span>
        `;
    }).join('');
}

export function renderProgress (progress) {
    const root = document.getElementById('navbar-root');
    if (!root) return;

    let bar = root.querySelector('.graph-progress');
    if (!bar) {
        bar = document.createElement('div');
        bar.className = 'graph-progress';
        bar.setAttribute('aria-label', 'Avance completado');
        root.appendChild(bar);
    }

    const stats = progress || getGraphProgress();
    bar.innerHTML = progressMarkup(stats);
};

function bumpProgressItem(key, done, total, label, delta) {
    const item = document.querySelector(`.graph-progress__item[data-progress-key="${key}"]`);
    if (!item) return;

    const count = item.querySelector('.graph-progress__count');
    if (count) count.textContent = `${done}/${total}`;
    item.setAttribute('title', `${done} de ${total} ${label}`);

    item.classList.remove('is-pop', 'is-pop--down');
    void item.offsetWidth;
    item.classList.add('is-pop');
    if (delta < 0) item.classList.add('is-pop--down');

    const plus = document.createElement('span');
    plus.className = 'graph-progress__plus' + (delta < 0 ? ' graph-progress__plus--down' : '');
    plus.textContent = (delta < 0 ? '−' : '+') + (key === 'xp' ? String(Math.abs(delta)) : '1');
    item.appendChild(plus);
    window.setTimeout(() => plus.remove(), 800);
}

export function animateProgress (payload) {
    const result = payload || {};
    const before = result.before || getGraphProgress();
    const after = result.after || getGraphProgress();
    const unlocked = result.unlocked || {};
    const restored = result.restored || {};

    renderProgress(before);

    const sequence = [];
    if (unlocked.step) sequence.push({ key: 'pasos', label: 'pasos', delta: 1 });
    if (unlocked.module) sequence.push({ key: 'modulos', label: 'módulos', delta: 1 });
    if (unlocked.route) sequence.push({ key: 'rutas', label: 'rutas', delta: 1 });
    if (restored.step) sequence.push({ key: 'pasos', label: 'pasos', delta: -1 });
    if (restored.module) sequence.push({ key: 'modulos', label: 'módulos', delta: -1 });
    if (restored.route) sequence.push({ key: 'rutas', label: 'rutas', delta: -1 });

    const xpDelta = ((after.xp && after.xp.done) || 0) - ((before.xp && before.xp.done) || 0);
    if (xpDelta) sequence.push({ key: 'xp', label: 'XP', delta: xpDelta });

    sequence.forEach((item, index) => {
        window.setTimeout(() => {
            bumpProgressItem(item.key, after[item.key].done, after[item.key].total, item.label, item.delta);
        }, 180 + (index * 560));
    });
};
