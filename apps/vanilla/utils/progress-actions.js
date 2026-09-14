import { getGraphProgress } from './progress-graph.js';
import { isStepDone, readProgressState, stepProgressKey, writeProgressState } from './progress.js';
import { isModuleDone, isRouteDone, isStepLocked } from './progress-status.js';
import { areAllStepTasksDone } from './progress-tasks.js';
import { animateProgress } from '../components/progress.js';

let pendingProgressReveal = null;

export function uncompleteStep (routeId, moduleId, stepId) {
    const before = getGraphProgress();
    const wasDone = isStepDone(routeId, moduleId, stepId);
    const moduleWasDone = isModuleDone(routeId, moduleId);
    const routeWasDone = isRouteDone(routeId);

    if (wasDone) {
        const state = readProgressState();
        delete state.steps[stepProgressKey(routeId, moduleId, stepId)];
        writeProgressState(state);
    }

    const after = getGraphProgress();
    return {
        already: !wasDone,
        before: before,
        after: after,
        unlocked: { step: false, module: false, route: false },
        restored: {
            step: wasDone,
            module: wasDone && moduleWasDone && !isModuleDone(routeId, moduleId),
            route: wasDone && routeWasDone && !isRouteDone(routeId)
        }
    };
};

export function completeStep (routeId, moduleId, stepId) {
    const before = getGraphProgress();
    if (
        isStepLocked(routeId, moduleId, stepId) ||
        !areAllStepTasksDone(routeId, moduleId, stepId)
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

    const already = isStepDone(routeId, moduleId, stepId);
    const moduleWasDone = isModuleDone(routeId, moduleId);
    const routeWasDone = isRouteDone(routeId);

    if (!already) {
        const state = readProgressState();
        state.steps[stepProgressKey(routeId, moduleId, stepId)] = Date.now();
        writeProgressState(state);
    }

    const after = getGraphProgress();
    return {
        already: already,
        before: before,
        after: after,
        unlocked: {
            step: !already,
            module: !already && !moduleWasDone && isModuleDone(routeId, moduleId),
            route: !already && !routeWasDone && isRouteDone(routeId)
        },
        restored: { step: false, module: false, route: false }
    };
};

export function queueProgressReveal (payload) {
    pendingProgressReveal = payload || null;
};

export function flushProgressReveal () {
    const payload = pendingProgressReveal;
    pendingProgressReveal = null;
    if (payload && typeof animateProgress === 'function') {
        animateProgress(payload);
    }
};
