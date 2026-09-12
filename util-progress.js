window.App = window.App || {};

const PROGRESS_KEY = 'openmad.progress.v1';

function emptyProgressState() {
    return { steps: {}, tasks: {} };
}

window.App.stepProgressKey = function (routeId, moduleId, stepId) {
    return `${routeId || ''}::${moduleId || ''}::${stepId || ''}`;
};

window.App.taskProgressKey = function (routeId, moduleId, stepId, taskId) {
    return `${window.App.stepProgressKey(routeId, moduleId, stepId)}::${taskId || ''}`;
};

window.App.readProgressState = function () {
    try {
        const raw = window.localStorage.getItem(PROGRESS_KEY);
        if (!raw) return emptyProgressState();
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object' || !parsed.steps || typeof parsed.steps !== 'object') {
            return emptyProgressState();
        }
        if (!parsed.tasks || typeof parsed.tasks !== 'object') parsed.tasks = {};
        return parsed;
    } catch (error) {
        return emptyProgressState();
    }
};

window.App.writeProgressState = function (state) {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(state || emptyProgressState()));
};

window.App.isStepDone = function (routeId, moduleId, stepId) {
    const key = window.App.stepProgressKey(routeId, moduleId, stepId);
    return !!window.App.readProgressState().steps[key];
};

window.App.getModuleSteps = function (moduleId) {
    return ((window.App.mocks && window.App.mocks.stepsByModule) || {})[moduleId] || [];
};

window.App.getRouteModules = function (routeId) {
    return ((window.App.mocks && window.App.mocks.modulesByRoute) || {})[routeId] || [];
};
