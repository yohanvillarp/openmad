window.App = window.App || {};

/**
 * @param {Array<{ icon: string, label: string, href?: string }>} crumbs
 * @returns {string}
 */
window.App.renderPath = function (crumbs) {
    const items = (crumbs || []).filter((item) => item && item.label);
    if (!items.length) return '';

    const html = items
        .map((item, index) => {
            const last = index === items.length - 1;
            const icon = `<span class="${item.icon || 'icon-ruta'}" aria-hidden="true"></span>`;
            const node = last || !item.href
                ? `<span class="path__current">${icon}<span>${item.label}</span></span>`
                : `<a class="path__link" href="${item.href}">${icon}<span>${item.label}</span></a>`;
            const sep = last ? '' : '<span class="path__sep" aria-hidden="true"></span>';
            return node + sep;
        })
        .join('');

    return `<nav class="path" aria-label="Ruta">${html}</nav>`;
};
