import { setStepTaskDone } from '../utils/progress-tasks.js';
import { rerenderRoutesView } from '../utils/routes-view.js';
import { animateProgress } from './progress.js';

export function renderMiniTask (options) {
    const opts = options || {};
    const done = !!opts.done;
    const ids = [
        `data-ruta="${opts.routeId || ''}"`,
        `data-modulo="${opts.moduleId || ''}"`,
        `data-paso="${opts.stepId || ''}"`,
        `data-tarea="${opts.taskId || ''}"`
    ].join(' ');
    const reference = opts.reference || {};
    const copyBox = opts.copyBox || {};
    const details = Array.isArray(opts.items) && opts.items.length
        ? `<span class="mini-task__details">
            ${opts.items.map((item) => `<span class="mini-task__detail">${item}</span>`).join('')}
          </span>`
        : '';

    const taskButton = `
    <button
      type="button"
      class="mini-task${done ? ' mini-task--done' : ''}${opts.code ? '' : ' mini-task--no-code'}"
      data-toggle-mini-task
      ${ids}
      aria-pressed="${done ? 'true' : 'false'}"
      aria-label="${done ? 'Desmarcar tarea' : 'Marcar tarea como completada'}"
    >
      <span class="mini-task__mark" aria-hidden="true">
        <span class="mini-task__check"></span>
      </span>
      ${opts.code ? `<code class="mini-task__code">${opts.code}</code>` : ''}
      <span class="mini-task__text">
        ${opts.text || ''}
        ${details}
      </span>
      <span class="mini-task__state">${done ? 'Completada' : 'Pendiente'}</span>
    </button>
  `;

    const copyControl = copyBox.id && copyBox.content
        ? `<div class="copy-box">
            <div id="${copyBox.id}" class="copy-box__content">${copyBox.content}</div>
            <button
              type="button"
              class="copy-btn copy-box__btn"
              data-copy-target="${copyBox.id}"
              aria-label="Copiar mensaje"
              title="Copiar mensaje"
            >
              <span class="copy-box__icon-copy" aria-hidden="true"></span>
              <span class="copy-box__icon-success" aria-hidden="true"></span>
            </button>
          </div>`
        : '';

    const referenceControl = reference.panelId
        ? `<button
            type="button"
            class="mini-task__reference"
            data-info-panel-target="${reference.panelId}"
            aria-controls="${reference.panelId}"
            aria-expanded="false"
          >
            ${reference.label || 'Consultar información relacionada'}
            <span aria-hidden="true">→</span>
          </button>`
        : (reference.href ? `<a class="mini-task__reference" href="${reference.href}">
            ${reference.label || 'Consultar información relacionada'}
            <span aria-hidden="true">→</span>
          </a>` : '');

    if (!copyControl && !referenceControl) return taskButton;

    return `
    <div class="mini-task-group">
      ${taskButton}
      ${copyControl}
      ${referenceControl}
    </div>
  `;
};

let miniTaskEventsBound = false;

if (!miniTaskEventsBound) {
    miniTaskEventsBound = true;
    document.addEventListener('click', (event) => {
        const panelTrigger = event.target.closest('[data-info-panel-target]');
        if (panelTrigger) {
            const panel = document.getElementById(panelTrigger.dataset.infoPanelTarget || '');
            if (!panel) return;

            const shouldOpen = panel.hidden;
            panel.hidden = !shouldOpen;
            panelTrigger.setAttribute('aria-expanded', String(shouldOpen));
            if (shouldOpen) {
                panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            return;
        }

        const button = event.target.closest('[data-toggle-mini-task]');
        if (!button) return;

        const result = setStepTaskDone(
            button.getAttribute('data-ruta') || '',
            button.getAttribute('data-modulo') || '',
            button.getAttribute('data-paso') || '',
            button.getAttribute('data-tarea') || '',
            button.getAttribute('aria-pressed') !== 'true'
        );

        rerenderRoutesView();
        if (result.restored.step && typeof animateProgress === 'function') {
            animateProgress(result);
        }
    });
}
