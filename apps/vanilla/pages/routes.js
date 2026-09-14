import { routes, routeIntro } from '../mocks/routes.js';
import { getHashQuery } from '../utils/hash.js';
import { isRouteLocked, isModuleLocked, isStepLocked, getRouteStatus, getRouteProgressCount } from '../utils/progress-status.js';
import { renderStepDetail } from './step-detail.js';
import { renderModuleSteps } from './module-steps.js';
import { renderRouteModules } from './route-modules.js';
import { renderRouteCard } from '../components/route-card.js';
import { renderRoutesHeader } from '../components/routes-header.js';


export function renderRoutes (container) {
        const query = getHashQuery();
    const routeId = query.get('ruta');
    const moduleId = query.get('modulo');
    const stepId = query.get('paso');
    const selected = routes.find((route) => route.id === routeId);
    const requirementsModuleSelected = selected &&
        selected.requirements &&
        selected.requirements.id === moduleId;

    if (selected && isRouteLocked(selected.id)) {
        window.location.hash = '#rutas';
        return;
    }
    if (selected && moduleId && !requirementsModuleSelected && isModuleLocked(selected.id, moduleId)) {
        window.location.hash = `#rutas?ruta=${encodeURIComponent(selected.id)}`;
        return;
    }
    if (selected && moduleId && stepId && isStepLocked(selected.id, moduleId, stepId)) {
        window.location.hash = `#rutas?ruta=${encodeURIComponent(selected.id)}&modulo=${encodeURIComponent(moduleId)}`;
        return;
    }
    if (selected && moduleId && stepId) {
        renderStepDetail(container, selected, moduleId, stepId);
        return;
    }
    if (selected && moduleId) {
        renderModuleSteps(container, selected, moduleId);
        return;
    }
    if (selected) {
        renderRouteModules(container, selected);
        return;
    }

    const routeEntries = routes.map((route) => ({
        route,
        status: getRouteStatus(route.id),
        progress: getRouteProgressCount(route.id)
    }));
    const availableRoutes = routeEntries.filter((entry) => entry.status !== 'locked');
    const upcomingRoutes = routeEntries.filter((entry) => entry.status === 'locked');
    const renderCards = (entries) => entries.map(({ route, status, progress }) => (
        renderRouteCard(route, { status, progress })
    )).join('');
    const availableCount = availableRoutes.length;
    const upcomingCount = upcomingRoutes.length;
    const availabilitySummary = [
        `${availableCount} ${availableCount === 1 ? 'ruta disponible' : 'rutas disponibles'}`,
        `${upcomingCount} en preparación`
    ].join(' · ');

    container.innerHTML = `
    <section class="page page--rutas">
      ${renderRoutesHeader({
          icon: 'icon-ruta',
          title: 'Rutas',
          lead: routeIntro,
          meta: availabilitySummary
      })}
      <section class="rutas-group" aria-labelledby="rutas-disponibles">
        <div class="rutas-group__header">
          <h2 id="rutas-disponibles">Rutas disponibles</h2>
          <span>${availableCount}</span>
        </div>
        <div class="rutas-list">${renderCards(availableRoutes)}</div>
      </section>
      ${upcomingCount ? `
        <section class="rutas-group rutas-group--upcoming" aria-labelledby="rutas-proximas">
          <div class="rutas-group__header">
            <h2 id="rutas-proximas">Próximamente</h2>
            <span>${upcomingCount}</span>
          </div>
          <div class="rutas-list rutas-list--upcoming">${renderCards(upcomingRoutes)}</div>
        </section>
      ` : ''}
    </section>
  `;
};
