import { modulesByRoute, moduleIntro } from '../mocks/modules.js';
import { getRouteScopeLabel } from '../mocks/routes.js';
import { renderModuleCard } from '../components/module-card.js';
import { getModuleStatus, getModuleProgressCount } from '../utils/progress-status.js';
import { renderPath } from '../components/path.js';
import { renderRoutesHeader } from '../components/routes-header.js';


export function renderRouteModules (container, route) {
    const modules = ((modulesByRoute || {})[route.id]) || [];
    const requirementsCard = route.requirements
        ? renderModuleCard(route.requirements, {
            color: route.requirements.color,
            routeId: route.id,
            status: 'informational'
        })
        : '';
    const cards = modules.map((item, index) => renderModuleCard(item, {
        index: index + 1,
        color: route.color,
        routeId: route.id,
        status: getModuleStatus(route.id, item.id),
        progress: getModuleProgressCount(route.id, item.id)
    })).join('');

    const empty = '<p class="rutas-empty">Esta ruta todavía no tiene módulos publicados.</p>';
    container.innerHTML = `
    <section class="page page--rutas">
      ${renderPath([
          { icon: 'icon-ruta', label: 'Rutas', href: '#rutas' },
          { icon: 'icon-ruta', label: route.label }
      ])}
      ${renderRoutesHeader({
          kicker: getRouteScopeLabel(route),
          icon: 'icon-modulo',
          title: route.label,
          lead: moduleIntro
      })}
      <section aria-labelledby="route-modules-title">
        <h2 class="route-modules-heading" id="route-modules-title">Módulos de la ruta</h2>
        <div class="rutas-list">${requirementsCard}${cards || empty}</div>
      </section>
    </section>
  `;

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons({ root: container });
    }
};
