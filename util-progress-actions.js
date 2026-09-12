window.App = window.App || {};

window.App.uncompleteStep = function (routeId, moduleId, stepId) {
    const before = window.App.getGraphProgress();
    const wasDone = window.App.isStepDone(routeId, moduleId, stepId);
    const moduleWasDone = window.App.isModuleDone(routeId, moduleId);
    const routeWasDone = window.App.isRouteDone(routeId);

    if (wasDone) {
        const state = window.App.readProgressState();
        delete state.steps[window.App.stepProgressKey(routeId, moduleId, stepId)];
        window.App.writeProgressState(state);
    }

    const after = window.App.getGraphProgress();
    return {
        already: !wasDone,
        before: before,
        after: after,
        unlocked: { step: false, module: false, route: false },
        restored: {
            step: wasDone,
            module: wasDone && moduleWasDone && !window.App.isModuleDone(routeId, moduleId),
            route: wasDone && routeWasDone && !window.App.isRouteDone(routeId)
        }
    };
};

window.App.completeStep = function (routeId, moduleId, stepId) {
    const before = window.App.getGraphProgress();
    if (
        window.App.isStepLocked(routeId, moduleId, stepId) ||
        !window.App.areAllStepTasksDone(routeId, moduleId, stepId)
    ) {
        return {
            blocked: true,
            already: false,
            before: before,
            after: before,
            unlocked: { step: false, module: false, route: false },
            restored: { step: false, module: false, route: false }
        };
    }

    const already = window.App.isStepDone(routeId, moduleId, stepId);
    const moduleWasDone = window.App.isModuleDone(routeId, moduleId);
    const routeWasDone = window.App.isRouteDone(routeId);

    if (!already) {
        const state = window.App.readProgressState();
        state.steps[window.App.stepProgressKey(routeId, moduleId, stepId)] = Date.now();
        window.App.writeProgressState(state);
    }

    const after = window.App.getGraphProgress();
    return {
        already: already,
        before: before,
        after: after,
        unlocked: {
            step: !already,
            module: !already && !moduleWasDone && window.App.isModuleDone(routeId, moduleId),
            route: !already && !routeWasDone && window.App.isRouteDone(routeId)
        },
        restored: { step: false, module: false, route: false }
    };
};

window.App.queueProgressReveal = function (payload) {
    window.App.pendingProgressReveal = payload || null;
};

window.App.flushProgressReveal = function () {
    const payload = window.App.pendingProgressReveal;
    window.App.pendingProgressReveal = null;
    if (payload && typeof window.App.animateProgress === 'function') {
        window.App.animateProgress(payload);
    }
};
