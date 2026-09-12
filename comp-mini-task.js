window.App = window.App || {};

window.App.renderMiniTask = function (options) {
    const opts = options || {};
    const done = !!opts.done;
    const ids = [
        `data-ruta="${opts.routeId || ''}"`,
        `data-modulo="${opts.moduleId || ''}"`,
        `data-paso="${opts.stepId || ''}"`,
        `data-mini-tarea="${opts.taskId || ''}"`
    ].join(' ');

    return `
    <button
      type="button"
      class="mini-task${done ? ' mini-task--done' : ''}${opts.code ? '' : ' mini-task--no-code'}"
      data-toggle-mini-task
      ${ids}
      aria-pressed="${done ? 'true' : 'false'}"
      aria-label="${done ? 'Desmarcar mini tarea' : 'Marcar mini tarea como completada'}"
    >
      <span class="mini-task__mark" aria-hidden="true">
        <span class="mini-task__check"></span>
      </span>
      ${opts.code ? `<code class="mini-task__code">${opts.code}</code>` : ''}
      <span class="mini-task__text">${opts.text || ''}</span>
      <span class="mini-task__state">${done ? 'Completada' : 'Pendiente'}</span>
    </button>
  `;
};

if (!window.App.miniTaskEventsBound) {
    window.App.miniTaskEventsBound = true;
    document.addEventListener('click', (event) => {
        const button = event.target.closest('[data-toggle-mini-task]');
        if (!button) return;

        const result = window.App.setStepTaskDone(
            button.getAttribute('data-ruta') || '',
            button.getAttribute('data-modulo') || '',
            button.getAttribute('data-paso') || '',
            button.getAttribute('data-mini-tarea') || '',
            button.getAttribute('aria-pressed') !== 'true'
        );

        window.App.rerenderRoutesView();
        if (result.restored.step && typeof window.App.animateProgress === 'function') {
            window.App.animateProgress(result);
        }
    });
}
