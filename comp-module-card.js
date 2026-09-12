window.App = window.App || {};

/**
 * @param {{
 *   id: string,
 *   label: string,
 *   summary?: string,
 *   href?: string
 * }} module
 * @param {{ index: number, color?: string, routeId?: string }} options
 * @returns {string}
 */
window.App.renderModuleCard = function (module, options) {
    const item = module || {};
    const opts = options || {};
    const index = opts.index || 1;
    const color = opts.color || '#3d4f63';
    const routeId = opts.routeId || '';
    const href = item.href || `#rutas?ruta=${encodeURIComponent(routeId)}&modulo=${encodeURIComponent(item.id || '')}`;
    const status = opts.status || 'pending';
    const progress = opts.progress || { done: 0, total: 0 };
    const steps = window.App.getModuleSteps(item.id || '').length;
    let stepsLabel = '';
    const xpLabel = window.App.formatXp(window.App.getModuleXp(routeId, item));
    if (status === 'done') {
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

    const tag = status === 'locked' ? 'article' : 'a';
    const link = status === 'locked' ? ' aria-disabled="true"' : ` href="${href}"`;

    return `
    <${tag} class="module-card module-card--${status}"${link}>
      <span class="module-card__mark" style="background:${color}">
        <span class="icon-modulo" aria-hidden="true"></span>
        <span class="module-card__index">${index}</span>
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
