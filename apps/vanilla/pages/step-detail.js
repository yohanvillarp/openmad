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
import { updateSeoTags } from '../utils/seo.js';


export function renderStepDetail (container, route, moduleId, stepId) {
    const modules = ((modulesByRoute || {})[route.id]) || [];
    const selectedModule = modules.find((item) => item.id === moduleId);
    if (!selectedModule) {
        window.location.hash = `#rutas?ruta=${encodeURIComponent(route.id)}`;
        return;
    }

    const steps = ((stepsByModule || {})[selectedModule.id]) || [];
    const step = steps.find((item) => item.id === stepId);
    if (!step) {
        window.location.hash = `#rutas?ruta=${encodeURIComponent(route.id)}&modulo=${encodeURIComponent(selectedModule.id)}`;
        return;
    }

    updateSeoTags({
        title: `${step.label} - ${route.label} | OpenMad UNAMAD`,
        description: step.summary || selectedModule.summary || stepIntro
    });

    const taskProgress = getStepTaskProgress(route.id, selectedModule.id, step.id);
    const body = stepHasGuide(step)
        ? renderTemplateGuide(step, {
            routeId: route.id,
            moduleId: selectedModule.id,
            stepId: step.id
        })
        : '<p class="rutas-empty">Este paso todavía no tiene detalle publicado.</p>';

    const completeAction = renderCompleteStep({
        routeId: route.id,
        moduleId: selectedModule.id,
        stepId: step.id,
        done: isStepDone(route.id, selectedModule.id, step.id),
        taskProgress: taskProgress
    });

    container.innerHTML = `
    <section class="page page--rutas">
      ${renderPath([
          { icon: 'icon-ruta', label: 'Rutas', href: '#rutas' },
          { icon: 'icon-ruta', label: route.label, href: `#rutas?ruta=${encodeURIComponent(route.id)}` },
          { icon: 'icon-modulo', label: selectedModule.label || 'Módulo', href: `#rutas?ruta=${encodeURIComponent(route.id)}&modulo=${encodeURIComponent(selectedModule.id)}` },
          { icon: 'icon-paso', label: step.label || 'Paso' }
      ])}
      ${renderRoutesHeader({
          kicker: selectedModule.label || 'Paso',
          icon: 'icon-paso',
          title: step.label || 'Paso',
          lead: step.summary || stepIntro,
          actionHtml: completeAction
      })}
      ${body}
    </section>
  `;

    bindCareerTables(container);
};
