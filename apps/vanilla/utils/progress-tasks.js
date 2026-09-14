import { stepProgressKey, getModuleSteps, readProgressState, taskProgressKey, isStepDone, writeProgressState } from './progress.js';
import { getGraphProgress } from './progress-graph.js';
import { isModuleDone, isRouteDone } from './progress-status.js';


function taskIdPart(value) {
    return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

function hasSavedTasks(state, routeId, moduleId, stepId) {
    const prefix = `${stepProgressKey(routeId, moduleId, stepId)}::`;
    return Object.keys(state.tasks || {}).some((key) => key.startsWith(prefix));
}

export function getStepTaskDefinitions (moduleId, stepId) {
    const step = getModuleSteps(moduleId).find((item) => item.id === stepId);
    const guide = (step && step.guide) || {};
    const tasks = [];

    (guide.keys || []).forEach((row, index) => {
        tasks.push({
            id: `point-${taskIdPart(row.code) || index + 1}`,
            code: row.code,
            text: row.text,
            items: row.items || [],
            copyBox: row.copyBox || null,
            reference: row.reference || null,
            group: ''
        });
    });

    (guide.sections || []).forEach((section, sectionIndex) => {
        const sectionId = taskIdPart(section.title) || `section-${sectionIndex + 1}`;
        (section.items || []).forEach((text, itemIndex) => {
            tasks.push({
                id: `${sectionId}-${itemIndex + 1}`,
                code: '',
                text: text,
                group: section.title || ''
            });
        });
    });

    return tasks;
};

export function isStepTaskDone (routeId, moduleId, stepId, taskId) {
    const state = readProgressState();
    const key = taskProgressKey(routeId, moduleId, stepId, taskId);
    if (state.tasks[key]) return true;
    if (hasSavedTasks(state, routeId, moduleId, stepId)) return false;
    return !!state.steps[stepProgressKey(routeId, moduleId, stepId)];
};

export function getStepTaskProgress (routeId, moduleId, stepId) {
    const tasks = getStepTaskDefinitions(moduleId, stepId);
    const done = tasks.filter((task) => (
        isStepTaskDone(routeId, moduleId, stepId, task.id)
    )).length;
    return { done: done, total: tasks.length };
};

export function areAllStepTasksDone (routeId, moduleId, stepId) {
    const progress = getStepTaskProgress(routeId, moduleId, stepId);
    return progress.total === 0 || progress.done === progress.total;
};

export function setStepTaskDone (routeId, moduleId, stepId, taskId, done) {
    const before = getGraphProgress();
    const stepWasDone = isStepDone(routeId, moduleId, stepId);
    const moduleWasDone = isModuleDone(routeId, moduleId);
    const routeWasDone = isRouteDone(routeId);
    const state = readProgressState();

    if (stepWasDone && !hasSavedTasks(state, routeId, moduleId, stepId)) {
        getStepTaskDefinitions(moduleId, stepId).forEach((task) => {
            state.tasks[taskProgressKey(routeId, moduleId, stepId, task.id)] = Date.now();
        });
    }

    const key = taskProgressKey(routeId, moduleId, stepId, taskId);
    if (done) state.tasks[key] = Date.now();
    else delete state.tasks[key];

    if (!done && stepWasDone) {
        delete state.steps[stepProgressKey(routeId, moduleId, stepId)];
    }

    writeProgressState(state);
    const after = getGraphProgress();

    return {
        done: done,
        before: before,
        after: after,
        unlocked: { step: false, module: false, route: false },
        restored: {
            step: !done && stepWasDone,
            module: !done && moduleWasDone && !isModuleDone(routeId, moduleId),
            route: !done && routeWasDone && !isRouteDone(routeId)
        }
    };
};
