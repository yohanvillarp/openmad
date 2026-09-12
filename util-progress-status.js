window.App = window.App || {};

window.App.isModuleDone = function (routeId, moduleId) {
    const steps = window.App.getModuleSteps(moduleId);
    if (!steps.length) return false;
    return steps.every((step) => window.App.isStepDone(routeId, moduleId, step.id));
};

window.App.isRouteDone = function (routeId) {
    const modules = window.App.getRouteModules(routeId);
    if (!modules.length) return false;
    return modules.every((mod) => window.App.isModuleDone(routeId, mod.id));
};

window.App.isRouteLocked = function (routeId) {
    return window.App.getRouteModules(routeId).length === 0;
};

window.App.isModuleLocked = function (routeId, moduleId) {
    const modules = window.App.getRouteModules(routeId);
    return !modules.some((mod) => mod.id === moduleId) ||
        window.App.getModuleSteps(moduleId).length === 0;
};

window.App.isStepLocked = function (routeId, moduleId, stepId) {
    return !window.App.getModuleSteps(moduleId).some((step) => step.id === stepId);
};

window.App.getModuleProgressCount = function (routeId, moduleId) {
    const steps = window.App.getModuleSteps(moduleId);
    const done = steps.filter((step) => window.App.isStepDone(routeId, moduleId, step.id)).length;
    return { done: done, total: steps.length };
};

window.App.getRouteProgressCount = function (routeId) {
    const modules = window.App.getRouteModules(routeId);
    const done = modules.filter((mod) => window.App.isModuleDone(routeId, mod.id)).length;
    return { done: done, total: modules.length };
};

window.App.getStepStatus = function (routeId, moduleId, stepId) {
    if (window.App.isStepDone(routeId, moduleId, stepId)) return 'done';
    if (window.App.isStepLocked(routeId, moduleId, stepId)) return 'locked';
    return 'pending';
};

window.App.getModuleStatus = function (routeId, moduleId) {
    if (window.App.isModuleDone(routeId, moduleId)) return 'done';
    const progress = window.App.getModuleProgressCount(routeId, moduleId);
    if (progress.done > 0) return 'active';
    if (window.App.isModuleLocked(routeId, moduleId)) return 'locked';
    return 'pending';
};

window.App.getRouteStatus = function (routeId) {
    if (window.App.isRouteLocked(routeId)) return 'locked';
    if (window.App.isRouteDone(routeId)) return 'done';
    const started = window.App.getRouteModules(routeId).some(
        (mod) => window.App.getModuleProgressCount(routeId, mod.id).done > 0
    );
    return started ? 'active' : 'pending';
};
