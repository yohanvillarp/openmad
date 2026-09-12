window.App = window.App || {};

window.App.renderRoutes = function (container) {
    const routes = (window.App.mocks && window.App.mocks.routes) || [];
    const query = window.App.getHashQuery();
    const routeId = query.get('ruta');
    const moduleId = query.get('modulo');
    const stepId = query.get('paso');
    const selected = routes.find((route) => route.id === routeId);

    if (selected && window.App.isRouteLocked(selected.id)) {
        window.location.hash = '#rutas';
        return;
    }
    if (selected && moduleId && window.App.isModuleLocked(selected.id, moduleId)) {
        window.location.hash = `#rutas?ruta=${encodeURIComponent(selected.id)}`;
        return;
    }
    if (selected && moduleId && stepId && window.App.isStepLocked(selected.id, moduleId, stepId)) {
        window.location.hash = `#rutas?ruta=${encodeURIComponent(selected.id)}&modulo=${encodeURIComponent(moduleId)}`;
        return;
    }
    if (selected && moduleId && stepId) {
        window.App.renderStepDetail(container, selected, moduleId, stepId);
        return;
    }
    if (selected && moduleId) {
        window.App.renderModuleSteps(container, selected, moduleId);
        return;
    }
    if (selected) {
        window.App.renderRouteModules(container, selected);
        return;
    }

    const cards = routes.map((route) => window.App.renderRouteCard(route, {
        status: window.App.getRouteStatus(route.id),
        progress: window.App.getRouteProgressCount(route.id)
    })).join('');

    container.innerHTML = `
    <section class="page page--rutas">
      ${window.App.renderRoutesHeader({
          icon: 'icon-ruta',
          title: 'Rutas',
          lead: window.App.mocks.routeIntro
      })}
      <div class="rutas-list">${cards}</div>
    </section>
  `;
};
