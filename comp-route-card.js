window.App = window.App || {};

/**
 * @param {{
 *   id: string,
 *   label: string,
 *   summary?: string,
 *   color?: string
 * }} route
 * @returns {string}
 */
window.App.renderRouteCard = function (route, options) {
    const opts = options || {};
    const id = route.id || '';
    const label = route.label || '';
    const summary = route.summary || '';
    const modules = window.App.getRouteModules(id).length;
    const status = opts.status || 'pending';
    const progress = opts.progress || { done: 0, total: 0 };
    const color = route.color || (window.App.mocks.university && window.App.mocks.university.color) || '#22c55e';
    let moduleLabel = '';
    const xpLabel = window.App.formatXp(window.App.getRouteXp(route));
    if (status === 'done') {
        moduleLabel = `Completada · ${modules} ${modules === 1 ? 'módulo' : 'módulos'} · ${xpLabel}`;
    } else if (status === 'active') {
        moduleLabel = `En curso · ${progress.done}/${modules} módulos · ${xpLabel}`;
    } else if (status === 'locked') {
        moduleLabel = 'Bloqueada · Contenido en preparación';
    } else if (modules > 0) {
        moduleLabel = `Pendiente · ${modules} ${modules === 1 ? 'módulo' : 'módulos'} · ${xpLabel}`;
    } else {
        moduleLabel = 'Contenido pendiente de publicación';
    }

    const tag = status === 'locked' ? 'article' : 'a';
    const link = status === 'locked'
        ? ' aria-disabled="true"'
        : ` href="#rutas?ruta=${encodeURIComponent(id)}"`;

    return `
    <${tag} class="route-card route-card--${status}"${link}>
      <span class="route-card__mark" style="background:${color}">
        <span class="icon-ruta" aria-hidden="true"></span>
      </span>
      <span class="route-card__body">
        <span class="route-card__title">${label}</span>
        <span class="route-card__summary">${summary}</span>
        ${moduleLabel ? `<span class="route-card__meta">${moduleLabel}</span>` : ''}
      </span>
      ${status === 'done'
        ? '<span class="card-check" aria-hidden="true"></span>'
        : (status === 'locked'
            ? '<span class="card-lock" aria-hidden="true"></span>'
            : '<span class="route-card__go" aria-hidden="true"></span>')}
    </${tag}>
  `;
};
