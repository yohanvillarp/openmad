import { modulesByRoute } from '../mocks/modules.js';
import { stepsByModule, stepIntro } from '../mocks/steps.js';
import { renderStepCard } from '../components/step-card.js';
import { bindRouteRequirements, renderRouteRequirements } from '../components/route-requirements.js';
import { isStepDone } from '../utils/progress.js';
import { getStepStatus } from '../utils/progress-status.js';
import { renderPath } from '../components/path.js';
import { renderRoutesHeader } from '../components/routes-header.js';


function renderRequirementsModule(container, route) {
    const requirements = route.requirements;

    container.innerHTML = `
    <section class="page page--rutas">
      ${renderPath([
          { icon: 'icon-ruta', label: 'Rutas', href: '#rutas' },
          { icon: 'icon-ruta', label: route.label, href: `#rutas?ruta=${encodeURIComponent(route.id)}` },
          { icon: 'icon-modulo', label: requirements.label }
      ])}
      ${renderRoutesHeader({
          kicker: 'Información previa',
          icon: 'icon-modulo',
          title: requirements.label,
          lead: requirements.summary
      })}
      ${renderRouteRequirements(requirements.items)}
    </section>
  `;

    bindRouteRequirements(container);
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons({ root: container });
    }
}


export function renderModuleSteps (container, route, moduleId) {
    if (route.requirements && route.requirements.id === moduleId) {
        renderRequirementsModule(container, route);
        return;
    }

    const modules = ((modulesByRoute || {})[route.id]) || [];
    const selectedModule = modules.find((item) => item.id === moduleId);
    const steps = ((stepsByModule || {})[moduleId]) || [];
    const cards = steps.map((item, index) => renderStepCard(item, {
        index: index + 1,
        color: route.color,
        routeId: route.id,
        moduleId: moduleId,
        done: isStepDone(route.id, moduleId, item.id),
        status: getStepStatus(route.id, moduleId, item.id),
        href: `#rutas?ruta=${encodeURIComponent(route.id)}&modulo=${encodeURIComponent(moduleId)}&paso=${encodeURIComponent(item.id)}`
    })).join('');

    const empty = '<p class="rutas-empty">Este módulo todavía no tiene pasos publicados.</p>';
    container.innerHTML = `
    <section class="page page--rutas">
      ${renderPath([
          { icon: 'icon-ruta', label: 'Rutas', href: '#rutas' },
          { icon: 'icon-ruta', label: route.label, href: `#rutas?ruta=${encodeURIComponent(route.id)}` },
          { icon: 'icon-modulo', label: selectedModule ? selectedModule.label : 'Módulo' }
      ])}
      ${renderRoutesHeader({
          kicker: selectedModule ? selectedModule.label : 'Módulo',
          icon: 'icon-paso',
          title: 'Pasos',
          lead: stepIntro
      })}
      <div class="rutas-list">${cards || empty}</div>
    </section>
  `;
};
