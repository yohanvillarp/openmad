window.App = window.App || {};

window.App.renderRouteModules = function (container, route) {
    const modules = ((window.App.mocks.modulesByRoute || {})[route.id]) || [];
    const cards = modules.map((item, index) => window.App.renderModuleCard(item, {
        index: index + 1,
        color: route.color,
        routeId: route.id,
        status: window.App.getModuleStatus(route.id, item.id),
        progress: window.App.getModuleProgressCount(route.id, item.id)
    })).join('');

    const empty = '<p class="rutas-empty">Esta ruta todavía no tiene módulos publicados.</p>';
    container.innerHTML = `
    <section class="page page--rutas">
      ${window.App.renderPath([
          { icon: 'icon-ruta', label: 'Rutas', href: '#rutas' },
          { icon: 'icon-ruta', label: route.label }
      ])}
      ${window.App.renderRoutesHeader({
          kicker: route.label,
          icon: 'icon-modulo',
          title: 'Módulos',
          lead: window.App.mocks.moduleIntro
      })}
      <div class="rutas-list">${cards || empty}</div>
    </section>
  `;
};
