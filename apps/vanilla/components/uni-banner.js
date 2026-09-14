
/**
 * @param {{
 *   title: string,
 *   meta?: string,
 *   href?: string
 * }} options
 * @returns {string}
 */
export function renderUniBanner (options) {
    const title = options.title || '';
    const meta = options.meta || '';
    const href = options.href || '#rutas';
    const externalAttrs = /^https?:\/\//i.test(href)
        ? ' target="_blank" rel="noopener noreferrer"'
        : '';

    const metaHtml = meta
        ? `<span class="uni-banner__meta">
            ${meta}
            <i data-lucide="external-link" aria-hidden="true"></i>
          </span>`
        : '';

    return `
    <a class="uni-banner" href="${href}"${externalAttrs}>
      <span class="uni-banner__icon" aria-hidden="true">
        <i data-lucide="graduation-cap"></i>
      </span>
      <span class="uni-banner__title">${title}</span>
      ${metaHtml}
    </a>
  `;
};
