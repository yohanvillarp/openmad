window.App = window.App || {};

window.App.renderStepDetail = function (container, route, moduleId, stepId) {
    const modules = ((window.App.mocks.modulesByRoute || {})[route.id]) || [];
    const selectedModule = modules.find((item) => item.id === moduleId);
    const steps = ((window.App.mocks.stepsByModule || {})[moduleId]) || [];
    const step = steps.find((item) => item.id === stepId);
    const taskProgress = window.App.getStepTaskProgress(route.id, moduleId, stepId);
    const body = window.App.stepHasGuide(step)
        ? window.App.renderTemplateGuide(step, {
            routeId: route.id,
            moduleId: moduleId,
            stepId: stepId
        })
        : '<p class="rutas-empty">Este paso todavía no tiene detalle publicado.</p>';

    const completeAction = window.App.renderCompleteStep({
        routeId: route.id,
        moduleId: moduleId,
        stepId: stepId,
        done: window.App.isStepDone(route.id, moduleId, stepId),
        taskProgress: taskProgress
    });

    container.innerHTML = `
    <section class="page page--rutas">
      ${window.App.renderPath([
          { icon: 'icon-ruta', label: 'Rutas', href: '#rutas' },
          { icon: 'icon-ruta', label: route.label, href: `#rutas?ruta=${encodeURIComponent(route.id)}` },
          { icon: 'icon-modulo', label: selectedModule ? selectedModule.label : 'Módulo', href: `#rutas?ruta=${encodeURIComponent(route.id)}&modulo=${encodeURIComponent(moduleId)}` },
          { icon: 'icon-paso', label: step ? step.label : 'Paso' }
      ])}
      ${window.App.renderRoutesHeader({
          kicker: selectedModule ? selectedModule.label : 'Paso',
          icon: 'icon-paso',
          title: step ? step.label : 'Paso',
          lead: step && step.summary ? step.summary : window.App.mocks.stepIntro,
          actionHtml: completeAction
      })}
      ${body}
    </section>
  `;
};
