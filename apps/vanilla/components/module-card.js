import { getModuleSteps } from '../utils/progress.js';
import { formatXp, getModuleXp } from '../utils/xp.js';


/**
 * @param {{
 *   id: string,
 *   label: string,
 *   summary?: string,
 *   href?: string,
 *   kind?: string,
 *   color?: string
 * }} module
 * @param {{ index: number, color?: string, routeId?: string }} options
 * @returns {string}
 */
export function renderModuleCard (module, options) {
    const item = module || {};
    const opts = options || {};
    const index = opts.index || 1;
    const color = opts.color || '#3d4f63';
    const routeId = opts.routeId || '';
    const href = item.href || `#rutas?ruta=${encodeURIComponent(routeId)}&modulo=${encodeURIComponent(item.id || '')}`;
    const status = opts.status || 'pending';
    const isInformational = item.kind === 'informational';
    const progress = opts.progress || { done: 0, total: 0 };
    const steps = getModuleSteps(item.id || '').length;
    let stepsLabel = '';
    const xpLabel = formatXp(getModuleXp(routeId, item));
    if (isInformational) {
        stepsLabel = 'Información previa · No afecta tu progreso';
    } else if (status === 'done') {
        stepsLabel = `Completado · ${steps} ${steps === 1 ? 'paso' : 'pasos'} · ${xpLabel}`;
    } else if (status === 'active') {
        stepsLabel = `En curso · ${progress.done}/${steps} pasos · ${xpLabel}`;
    } else if (status === 'locked') {
        stepsLabel = steps > 0
            ? 'Bloqueado · Completa el módulo anterior'
            : 'Bloqueado · Contenido en preparación';
    } else if (steps > 0) {
        stepsLabel = `Pendiente · ${steps} ${steps === 1 ? 'paso' : 'pasos'} · ${xpLabel}`;
    } else {
        stepsLabel = 'Contenido pendiente de publicación';
    }

    const cardStatus = isInformational ? 'informational' : status;
    const tag = cardStatus === 'locked' ? 'article' : 'a';
    const link = status === 'locked' ? ' aria-disabled="true"' : ` href="${href}"`;

    return `
    <${tag} class="module-card module-card--${cardStatus}"${link}>
      <span class="module-card__mark" style="background:${color}">
        ${isInformational
            ? '<i class="module-card__info-icon" data-lucide="clipboard-check" aria-hidden="true"></i>'
            : `<span class="icon-modulo" aria-hidden="true"></span>
               <span class="module-card__index">${index}</span>`}
      </span>
      <span class="module-card__body">
        <span class="module-card__title">${item.label || ''}</span>
        <span class="module-card__summary">${item.summary || ''}</span>
        ${stepsLabel ? `<span class="module-card__meta">${stepsLabel}</span>` : ''}
      </span>
      ${status === 'done'
        ? '<span class="card-check" aria-hidden="true"></span>'
        : (status === 'locked'
            ? '<span class="card-lock" aria-hidden="true"></span>'
            : '<span class="module-card__go" aria-hidden="true"></span>')}
    </${tag}>
  `;
};
