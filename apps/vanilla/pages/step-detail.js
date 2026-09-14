import { modulesByRoute } from '../mocks/modules.js';
import { stepsByModule, stepIntro } from '../mocks/steps.js';
import { getStepTaskProgress } from '../utils/progress-tasks.js';
import { stepHasGuide } from '../utils/guide.js';
import { renderTemplateGuide } from '../components/template-guide.js';
import { bindCareerTables } from '../components/route-requirements.js';
import { renderCompleteStep } from '../components/complete.js';
import { isStepDone } from '../utils/progress.js';
import { renderPath } from '../components/path.js';
import { renderRoutesHeader } from '../components/routes-header.js';


export function renderStepDetail (container, route, moduleId, stepId) {
    const modules = ((modulesByRoute || {})[route.id]) || [];
    const selectedModule = modules.find((item) => item.id === moduleId);
    const steps = ((stepsByModule || {})[moduleId]) || [];
    const step = steps.find((item) => item.id === stepId);
    const taskProgress = getStepTaskProgress(route.id, moduleId, stepId);
    const body = stepHasGuide(step)
        ? renderTemplateGuide(step, {
            routeId: route.id,
            moduleId: moduleId,
            stepId: stepId
        })
        : '<p class="rutas-empty">Este paso todavía no tiene detalle publicado.</p>';

    const completeAction = renderCompleteStep({
        routeId: route.id,
        moduleId: moduleId,
        stepId: stepId,
        done: isStepDone(route.id, moduleId, stepId),
        taskProgress: taskProgress
    });

    container.innerHTML = `
    <section class="page page--rutas">
      ${renderPath([
          { icon: 'icon-ruta', label: 'Rutas', href: '#rutas' },
          { icon: 'icon-ruta', label: route.label, href: `#rutas?ruta=${encodeURIComponent(route.id)}` },
          { icon: 'icon-modulo', label: selectedModule ? selectedModule.label : 'Módulo', href: `#rutas?ruta=${encodeURIComponent(route.id)}&modulo=${encodeURIComponent(moduleId)}` },
          { icon: 'icon-paso', label: step ? step.label : 'Paso' }
      ])}
      ${renderRoutesHeader({
          kicker: selectedModule ? selectedModule.label : 'Paso',
          icon: 'icon-paso',
          title: step ? step.label : 'Paso',
          lead: step && step.summary ? step.summary : stepIntro,
          actionHtml: completeAction
      })}
      ${body}
    </section>
  `;

    bindCareerTables(container);
};
