import { stepsByModule } from '../mocks/steps.js';
import { modulesByRoute } from '../mocks/modules.js';


const PROGRESS_KEY = 'openmad.progress.v1';

function emptyProgressState() {
    return { steps: {}, tasks: {} };
}

export function stepProgressKey (routeId, moduleId, stepId) {
    return `${routeId || ''}::${moduleId || ''}::${stepId || ''}`;
};

export function taskProgressKey (routeId, moduleId, stepId, taskId) {
    return `${stepProgressKey(routeId, moduleId, stepId)}::${taskId || ''}`;
};

export function readProgressState () {
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

export function writeProgressState (state) {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(state || emptyProgressState()));
};

export function isStepDone (routeId, moduleId, stepId) {
    const key = stepProgressKey(routeId, moduleId, stepId);
    return !!readProgressState().steps[key];
};

export function getModuleSteps (moduleId) {
    return (stepsByModule || {})[moduleId] || [];
};

export function getRouteModules (routeId) {
    return (modulesByRoute || {})[routeId] || [];
};
