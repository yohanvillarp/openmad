import { getModuleSteps, isStepDone, getRouteModules } from './progress.js';


export function isModuleDone (routeId, moduleId) {
    const steps = getModuleSteps(moduleId);
    if (!steps.length) return false;
    return steps.every((step) => isStepDone(routeId, moduleId, step.id));
};

export function isRouteDone (routeId) {
    const modules = getRouteModules(routeId);
    if (!modules.length) return false;
    return modules.every((mod) => isModuleDone(routeId, mod.id));
};

export function isRouteLocked (routeId) {
    return getRouteModules(routeId).length === 0;
};

export function isModuleLocked (routeId, moduleId) {
    const modules = getRouteModules(routeId);
    return !modules.some((mod) => mod.id === moduleId) ||
        getModuleSteps(moduleId).length === 0;
};

export function isStepLocked (routeId, moduleId, stepId) {
    return !getModuleSteps(moduleId).some((step) => step.id === stepId);
};

export function getModuleProgressCount (routeId, moduleId) {
    const steps = getModuleSteps(moduleId);
    const done = steps.filter((step) => isStepDone(routeId, moduleId, step.id)).length;
    return { done: done, total: steps.length };
};

export function getRouteProgressCount (routeId) {
    const modules = getRouteModules(routeId);
    const done = modules.filter((mod) => isModuleDone(routeId, mod.id)).length;
    return { done: done, total: modules.length };
};

export function getStepStatus (routeId, moduleId, stepId) {
    if (isStepDone(routeId, moduleId, stepId)) return 'done';
    if (isStepLocked(routeId, moduleId, stepId)) return 'locked';
    return 'pending';
};

export function getModuleStatus (routeId, moduleId) {
    if (isModuleDone(routeId, moduleId)) return 'done';
    const progress = getModuleProgressCount(routeId, moduleId);
    if (progress.done > 0) return 'active';
    if (isModuleLocked(routeId, moduleId)) return 'locked';
    return 'pending';
};

export function getRouteStatus (routeId) {
    if (isRouteLocked(routeId)) return 'locked';
    if (isRouteDone(routeId)) return 'done';
    const started = getRouteModules(routeId).some(
        (mod) => getModuleProgressCount(routeId, mod.id).done > 0
    );
    return started ? 'active' : 'pending';
};
