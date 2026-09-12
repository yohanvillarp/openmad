window.App = window.App || {};

/**
 * @param {{
 *   label: string,
 *   href?: string,
 *   icon?: string,
 *   variant?: 'navy' | 'primary',
 *   type?: string
 * }} options
 * @returns {string}
 */
window.App.renderButton = function (options) {
    const label = options.label || '';
    const href = options.href || '';
    const icon = options.icon || 'arrow-right';
    const variant = options.variant || 'navy';
    const type = options.type || 'button';
    const classes = `btn btn--square btn--${variant}`;

    const inner = `
      <span class="btn__label">${label}</span>
      <i data-lucide="${icon}"></i>
    `;

    if (href) {
        return `<a class="${classes}" href="${href}">${inner}</a>`;
    }

    return `<button class="${classes}" type="${type}">${inner}</button>`;
};
