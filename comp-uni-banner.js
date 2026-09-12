window.App = window.App || {};

/**
 * @param {{
 *   title: string,
 *   shortTitle?: string,
 *   meta?: string,
 *   href?: string
 * }} options
 * @returns {string}
 */
window.App.renderUniBanner = function (options) {
    const title = options.title || '';
    const shortTitle = options.shortTitle || title;
    const meta = options.meta || '';
    const href = options.href || '#rutas';
    const externalAttrs = /^https?:\/\//i.test(href)
        ? ' target="_blank" rel="noopener noreferrer"'
        : '';

    const metaHtml = meta
        ? `<span class="uni-banner__meta">
            <span class="icon-ruta" aria-hidden="true"></span>
            ${meta}
          </span>`
        : '';

    return `
    <a class="uni-banner" href="${href}"${externalAttrs}>
      <span class="uni-banner__title uni-banner__title--full">${title}</span>
      <span class="uni-banner__title uni-banner__title--short">${shortTitle}</span>
      ${metaHtml}
    </a>
  `;
};
