
export function renderRoutesHeader (options) {
    const opts = options || {};
    const brand = opts.actionHtml
        ? `<div class="rutas-intro__brand rutas-intro__brand--action">${opts.actionHtml}</div>`
        : '';
    const withAction = brand ? ' rutas-intro--with-action' : '';

    return `
    <header class="rutas-intro${withAction}">
      <div class="rutas-intro__copy">
        ${opts.kicker ? `<p class="rutas-intro__kicker">${opts.kicker}</p>` : ''}
        <h1 class="rutas-intro__title">
          <span class="${opts.icon || 'icon-ruta'}" aria-hidden="true"></span>
          ${opts.title || ''}
        </h1>
        ${opts.lead ? `<p class="rutas-intro__lead">${opts.lead}</p>` : ''}
        ${opts.meta ? `<p class="rutas-intro__meta">${opts.meta}</p>` : ''}
      </div>
      ${brand}
    </header>
  `;
};
