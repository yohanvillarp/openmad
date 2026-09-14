import { getRouteModules } from '../utils/progress.js';
import { getRouteScopeLabel, university } from '../mocks/routes.js';
import { formatXp, getRouteXp } from '../utils/xp.js';


/**
 * @param {{
 *   id: string,
 *   label: string,
 *   summary?: string,
 *   color?: string,
 *   facultyId?: string,
 *   schoolId?: string
 * }} route
 * @returns {string}
 */
export function renderRouteCard (route, options) {
    const opts = options || {};
    const id = route.id || '';
    const label = route.label || '';
    const summary = route.summary || '';
    const modules = getRouteModules(id).length;
    const status = opts.status || 'pending';
    const progress = opts.progress || { done: 0, total: 0 };
    const color = route.color || (university && university.color) || '#22c55e';
    const scopeLabel = getRouteScopeLabel(route);
    const scopeStatus = route.facultyId || route.schoolId ? 'confirmed' : 'pending';
    let metaParts = [];
    const xpLabel = formatXp(getRouteXp(route));
    if (status === 'done') {
        metaParts = ['Completada', `${modules} ${modules === 1 ? 'módulo' : 'módulos'}`, xpLabel];
    } else if (status === 'active') {
        metaParts = ['En curso', `${progress.done}/${modules} módulos`, xpLabel];
    } else if (status === 'locked') {
        metaParts = ['Contenido en preparación'];
    } else if (modules > 0) {
        metaParts = ['Pendiente', `${modules} ${modules === 1 ? 'módulo' : 'módulos'}`, xpLabel];
    } else {
        metaParts = ['Contenido pendiente de publicación'];
    }
    const metaLabel = metaParts.join(' · ');

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
        <span class="route-card__heading">
          <span class="route-card__title">${label}</span>
          <span class="route-card__scope route-card__scope--${scopeStatus}">${scopeLabel}</span>
        </span>
        <span class="route-card__summary">${summary}</span>
        ${metaLabel ? `<span class="route-card__meta">${metaLabel}</span>` : ''}
      </span>
      ${status === 'done'
        ? '<span class="card-check" aria-hidden="true"></span>'
        : (status === 'locked'
            ? '<span class="card-lock" aria-hidden="true"></span>'
            : '<span class="route-card__go" aria-hidden="true"></span>')}
    </${tag}>
  `;
};
