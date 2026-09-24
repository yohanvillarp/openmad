import { uncompleteStep, completeStep, queueProgressReveal } from '../utils/progress-actions.js';
import { rerenderRoutesView } from '../utils/routes-view.js';
import { animateProgress } from './progress.js';
import { escapeHtml } from '../utils/sanitize.js';


export function renderCompleteStep (options) {
    const opts = options || {};
    const done = !!opts.done;
    const taskProgress = opts.taskProgress || { done: 0, total: 0 };
    const hasPendingTasks = taskProgress.total > 0 && taskProgress.done < taskProgress.total;
    const ids = `data-ruta="${escapeHtml(opts.routeId || '')}" data-modulo="${escapeHtml(opts.moduleId || '')}" data-paso="${escapeHtml(opts.stepId || '')}"`;

    if (done) {
        return `
    <div class="complete-step complete-step--done">
      <div class="complete-step__status">
        <span class="complete-step__mark" aria-hidden="true">
          <span class="icon-paso"></span>
          <span class="complete-step__check"></span>
        </span>
        <span class="complete-step__label">Completado</span>
      </div>
      <button
        type="button"
        class="complete-step__undo"
        data-restore-step
        ${ids}
      >
        Desmarcar
      </button>
    </div>
  `;
    }

    return `
    <button
      type="button"
      class="complete-step"
      data-complete-step
      ${ids}
      ${hasPendingTasks ? 'disabled' : ''}
      aria-label="${hasPendingTasks ? 'Completa primero todas las tareas' : 'Completar paso'}"
    >
      <span class="complete-step__ring" aria-hidden="true"></span>
      <span class="complete-step__mark" aria-hidden="true">
        <span class="icon-paso"></span>
        <span class="complete-step__check"></span>
      </span>
      <span class="complete-step__label">
        ${hasPendingTasks ? `${taskProgress.done}/${taskProgress.total} tareas` : 'Completar paso'}
      </span>
    </button>
  `;
};

function spawnCompleteParticles(button) {
    const colors = ['#fbbf24', '#ffffff', '#34d399', '#f54477', '#a78bfa'];
    for (let index = 0; index < 12; index += 1) {
        const particle = document.createElement('span');
        particle.className = 'complete-step__particle';
        const angle = ((index / 12) * Math.PI * 2) + (Math.random() * 0.4);
        const distance = 54 + Math.random() * 28;
        particle.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);
        particle.style.background = colors[index % colors.length];
        button.appendChild(particle);
    }
}

let completeStepBound = false;
function bindCompleteStep() {
    if (completeStepBound) return;
    completeStepBound = true;

    document.addEventListener('click', (event) => {
        const restore = event.target.closest('[data-restore-step]');
        if (restore) {
            event.preventDefault();
            const routeId = restore.getAttribute('data-ruta') || '';
            const moduleId = restore.getAttribute('data-modulo') || '';
            const stepId = restore.getAttribute('data-paso') || '';
            const result = uncompleteStep(routeId, moduleId, stepId);
            rerenderRoutesView();
            if (typeof animateProgress === 'function') {
                animateProgress(result);
            }
            return;
        }

        const button = event.target.closest('[data-complete-step]');
        if (!button || button.classList.contains('is-burst')) return;

        const routeId = button.getAttribute('data-ruta') || '';
        const moduleId = button.getAttribute('data-modulo') || '';
        const stepId = button.getAttribute('data-paso') || '';
        const listHash = `#rutas?ruta=${encodeURIComponent(routeId)}&modulo=${encodeURIComponent(moduleId)}`;

        const result = completeStep(routeId, moduleId, stepId);
        if (result.blocked) return;
        queueProgressReveal(result);

        button.classList.add('is-burst');
        button.disabled = true;
        const label = button.querySelector('.complete-step__label');
        if (label) label.textContent = '¡Listo!';
        spawnCompleteParticles(button);

        window.setTimeout(() => {
            window.location.hash = listHash;
        }, 900);
    });
}

bindCompleteStep();
