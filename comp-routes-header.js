window.App = window.App || {};

window.App.renderRoutesHeader = function (options) {
    const opts = options || {};
    const program = (window.App.mocks && window.App.mocks.program) || {};
    const brand = opts.actionHtml
        ? `<div class="rutas-intro__brand rutas-intro__brand--action">${opts.actionHtml}</div>`
        : `<div class="rutas-intro__brand" style="background:${program.color || '#7c6bc4'}">${program.code || 'ISI'}</div>`;

    return `
    <header class="rutas-intro">
      <div class="rutas-intro__copy">
        ${opts.kicker ? `<p class="rutas-intro__kicker">${opts.kicker}</p>` : ''}
        <h1 class="rutas-intro__title">
          <span class="${opts.icon || 'icon-ruta'}" aria-hidden="true"></span>
          ${opts.title || ''}
        </h1>
        ${opts.lead ? `<p class="rutas-intro__lead">${opts.lead}</p>` : ''}
      </div>
      ${brand}
    </header>
  `;
};
