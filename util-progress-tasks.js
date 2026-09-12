window.App = window.App || {};

function taskIdPart(value) {
    return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

function hasSavedTasks(state, routeId, moduleId, stepId) {
    const prefix = `${window.App.stepProgressKey(routeId, moduleId, stepId)}::`;
    return Object.keys(state.tasks || {}).some((key) => key.startsWith(prefix));
}

window.App.getStepTaskDefinitions = function (moduleId, stepId) {
    const step = window.App.getModuleSteps(moduleId).find((item) => item.id === stepId);
    const guide = (step && step.guide) || {};
    const tasks = [];

    (guide.keys || []).forEach((row, index) => {
        tasks.push({
            id: `point-${taskIdPart(row.code) || index + 1}`,
            code: row.code,
            text: row.text,
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

window.App.isStepTaskDone = function (routeId, moduleId, stepId, taskId) {
    const state = window.App.readProgressState();
    const key = window.App.taskProgressKey(routeId, moduleId, stepId, taskId);
    if (state.tasks[key]) return true;
    if (hasSavedTasks(state, routeId, moduleId, stepId)) return false;
    return !!state.steps[window.App.stepProgressKey(routeId, moduleId, stepId)];
};

window.App.getStepTaskProgress = function (routeId, moduleId, stepId) {
    const tasks = window.App.getStepTaskDefinitions(moduleId, stepId);
    const done = tasks.filter((task) => (
        window.App.isStepTaskDone(routeId, moduleId, stepId, task.id)
    )).length;
    return { done: done, total: tasks.length };
};

window.App.areAllStepTasksDone = function (routeId, moduleId, stepId) {
    const progress = window.App.getStepTaskProgress(routeId, moduleId, stepId);
    return progress.total === 0 || progress.done === progress.total;
};

window.App.setStepTaskDone = function (routeId, moduleId, stepId, taskId, done) {
    const before = window.App.getGraphProgress();
    const stepWasDone = window.App.isStepDone(routeId, moduleId, stepId);
    const moduleWasDone = window.App.isModuleDone(routeId, moduleId);
    const routeWasDone = window.App.isRouteDone(routeId);
    const state = window.App.readProgressState();

    if (stepWasDone && !hasSavedTasks(state, routeId, moduleId, stepId)) {
        window.App.getStepTaskDefinitions(moduleId, stepId).forEach((task) => {
            state.tasks[window.App.taskProgressKey(routeId, moduleId, stepId, task.id)] = Date.now();
        });
    }

    const key = window.App.taskProgressKey(routeId, moduleId, stepId, taskId);
    if (done) state.tasks[key] = Date.now();
    else delete state.tasks[key];

    if (!done && stepWasDone) {
        delete state.steps[window.App.stepProgressKey(routeId, moduleId, stepId)];
    }

    window.App.writeProgressState(state);
    const after = window.App.getGraphProgress();

    return {
        done: done,
        before: before,
        after: after,
        unlocked: { step: false, module: false, route: false },
        restored: {
            step: !done && stepWasDone,
            module: !done && moduleWasDone && !window.App.isModuleDone(routeId, moduleId),
            route: !done && routeWasDone && !window.App.isRouteDone(routeId)
        }
    };
};
