window.App = window.App || {};

window.App.getGraphProgress = function () {
    const routes = (window.App.mocks && window.App.mocks.routes) || [];
    const modulesByRoute = (window.App.mocks && window.App.mocks.modulesByRoute) || {};
    const stepsByModule = (window.App.mocks && window.App.mocks.stepsByModule) || {};
    let modulesTotal = 0;
    let stepsTotal = 0;
    let routesDone = 0;
    let modulesDone = 0;
    let stepsDone = 0;

    routes.forEach((route) => {
        const modules = modulesByRoute[route.id] || [];
        if (!modules.length) return;

        modulesTotal += modules.length;
        if (window.App.isRouteDone(route.id)) routesDone += 1;

        modules.forEach((mod) => {
            const steps = stepsByModule[mod.id] || [];
            stepsTotal += steps.length;
            if (steps.length && window.App.isModuleDone(route.id, mod.id)) modulesDone += 1;
            steps.forEach((step) => {
                if (window.App.isStepDone(route.id, mod.id, step.id)) stepsDone += 1;
            });
        });
    });

    return {
        rutas: {
            done: routesDone,
            total: routes.filter((route) => (modulesByRoute[route.id] || []).length > 0).length
        },
        modulos: { done: modulesDone, total: modulesTotal },
        pasos: { done: stepsDone, total: stepsTotal },
        xp: typeof window.App.getXpProgress === 'function'
            ? window.App.getXpProgress()
            : { done: 0, total: 0 }
    };
};
