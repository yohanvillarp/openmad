window.App = window.App || {};

window.App.renderModuleSteps = function (container, route, moduleId) {
    const modules = ((window.App.mocks.modulesByRoute || {})[route.id]) || [];
    const selectedModule = modules.find((item) => item.id === moduleId);
    const steps = ((window.App.mocks.stepsByModule || {})[moduleId]) || [];
    const cards = steps.map((item, index) => window.App.renderStepCard(item, {
        index: index + 1,
        color: route.color,
        routeId: route.id,
        moduleId: moduleId,
        done: window.App.isStepDone(route.id, moduleId, item.id),
        status: window.App.getStepStatus(route.id, moduleId, item.id),
        href: `#rutas?ruta=${encodeURIComponent(route.id)}&modulo=${encodeURIComponent(moduleId)}&paso=${encodeURIComponent(item.id)}`
    })).join('');

    const empty = '<p class="rutas-empty">Este módulo todavía no tiene pasos publicados.</p>';
    container.innerHTML = `
    <section class="page page--rutas">
      ${window.App.renderPath([
          { icon: 'icon-ruta', label: 'Rutas', href: '#rutas' },
          { icon: 'icon-ruta', label: route.label, href: `#rutas?ruta=${encodeURIComponent(route.id)}` },
          { icon: 'icon-modulo', label: selectedModule ? selectedModule.label : 'Módulo' }
      ])}
      ${window.App.renderRoutesHeader({
          kicker: selectedModule ? selectedModule.label : 'Módulo',
          icon: 'icon-paso',
          title: 'Pasos',
          lead: window.App.mocks.stepIntro
      })}
      <div class="rutas-list">${cards || empty}</div>
    </section>
  `;
};
