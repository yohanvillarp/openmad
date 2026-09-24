import { university as defaultUniversity, routes as defaultRoutes } from '../mocks/routes.js';


/**
 * @param {{
 *   code?: string,
 *   name?: string,
 *   color?: string,
 *   routes?: Array<{ id: string, label: string }>
 * }} options
 * @returns {string}
 */
export function renderUniCard (options) {
    const opts = options || {};
    const uni = opts.university || defaultUniversity || {};
    const routeList = opts.routes || defaultRoutes || [];
    const code = uni.code || 'UNAMAD';
    const name = uni.name || '';
    const color = uni.color || '#22c55e';
    const count = routeList.length;

    const routesHtml = routeList
        .map((route) => `
        <a class="uni-card__route" href="#rutas?ruta=${encodeURIComponent(route.id)}">
          <span class="icon-ruta" aria-hidden="true"></span>
          ${route.label}
        </a>
      `)
        .join('');

    return `
    <article class="uni-card">
      <div class="uni-card__brand" style="background:${color}">${code}</div>
      <div class="uni-card__body">
        <h2 class="uni-card__title">${name}</h2>
        <div class="uni-card__routes">
          ${routesHtml}
        </div>
      </div>
      <div class="uni-card__stat">
        <p class="uni-card__count">
          <span class="icon-ruta" aria-hidden="true"></span>
          <span>${count}</span>
        </p>
        <p class="uni-card__caption">Rutas disponibles</p>
      </div>
    </article>
  `;
};
