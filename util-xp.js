window.App = window.App || {};

window.App.XP_PASO = 10;
window.App.XP_POR_PASO_EN_MODULO = 20;
window.App.XP_POR_MODULO_EN_RUTA = 50;

window.App.getStepXp = function () {
    return window.App.XP_PASO;
};

window.App.getModuleXp = function (routeId, moduleItem) {
    const item = moduleItem || {};
    const count = window.App.getModuleSteps(item.id || '').length;
    return window.App.XP_POR_PASO_EN_MODULO * count;
};

window.App.getRouteXp = function (route) {
    const item = route || {};
    const count = window.App.getRouteModules(item.id || '').length;
    return window.App.XP_POR_MODULO_EN_RUTA * count;
};

window.App.formatXp = function (value) {
    return `${value || 0} XP`;
};

window.App.getXpProgress = function () {
    const routes = (window.App.mocks && window.App.mocks.routes) || [];
    let earned = 0;
    let total = 0;

    routes.forEach((route) => {
        const routeXp = window.App.getRouteXp(route);
        total += routeXp;
        if (window.App.isRouteDone(route.id)) earned += routeXp;

        window.App.getRouteModules(route.id).forEach((mod) => {
            const moduleXp = window.App.getModuleXp(route.id, mod);
            total += moduleXp;
            if (window.App.isModuleDone(route.id, mod.id)) earned += moduleXp;

            window.App.getModuleSteps(mod.id).forEach((step) => {
                const stepXp = window.App.getStepXp();
                total += stepXp;
                if (window.App.isStepDone(route.id, mod.id, step.id)) earned += stepXp;
            });
        });
    });

    return { done: earned, total: total };
};
