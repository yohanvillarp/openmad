import { getStepTaskProgress } from '../utils/progress-tasks.js';
import { formatXp, getStepXp } from '../utils/xp.js';


/**
 * @param {{
 *   id: string,
 *   label: string,
 *   summary?: string,
 *   template?: boolean,
 *   validity?: boolean,
 *   cost?: string
 * }} step
 * @param {{ index: number, color?: string }} options
 * @returns {string}
 */
export function renderStepCard (step, options) {
    const item = step || {};
    const opts = options || {};
    const index = opts.index || 1;
    const color = opts.color || '#3d4f63';
    const href = opts.href || '';
    const status = opts.status || (opts.done ? 'done' : 'pending');
    const taskProgress = getStepTaskProgress(
        opts.routeId || '',
        opts.moduleId || '',
        item.id || ''
    );
    const bits = [];
    if (status === 'done') bits.push('Completado');
    else if (status === 'locked') bits.push('Bloqueado · Completa el paso anterior');
    else bits.push('Pendiente');
    if (item.cost) bits.push(item.cost);
    if (item.template) bits.push('Plantilla');
    if (item.validity) bits.push('Tiene plazo');
    if (taskProgress.total) bits.push(`${taskProgress.done}/${taskProgress.total} tareas`);
    bits.push(formatXp(getStepXp()));
    const meta = bits.join(' · ');
    const canNavigate = href && status !== 'locked';
    const tag = canNavigate ? 'a' : 'article';
    const extra = canNavigate ? ` href="${href}"` : (status === 'locked' ? ' aria-disabled="true"' : '');
    const staticClass = href ? '' : ' step-card--static';

    return `
    <${tag} class="step-card step-card--${status}${staticClass}"${extra}>
      <span class="step-card__mark" style="background:${color}">
        <span class="icon-paso" aria-hidden="true"></span>
        <span class="step-card__index">${index}</span>
      </span>
      <span class="step-card__body">
        <span class="step-card__title">${item.label || ''}</span>
        <span class="step-card__summary">${item.summary || ''}</span>
        <span class="step-card__meta">${meta}</span>
      </span>
      ${status === 'done'
        ? '<span class="card-check" aria-hidden="true"></span>'
        : (status === 'locked'
            ? '<span class="card-lock" aria-hidden="true"></span>'
            : (href ? '<span class="step-card__go" aria-hidden="true"></span>' : ''))}
    </${tag}>
  `;
};
