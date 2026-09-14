import { routes } from '../mocks/routes.js';
import { modulesByRoute } from '../mocks/modules.js';
import { stepsByModule } from '../mocks/steps.js';
import { isRouteDone, isModuleDone } from './progress-status.js';
import { isStepDone } from './progress.js';
import { getXpProgress } from './xp.js';


export function getGraphProgress () {
    let modulesTotal = 0;
    let stepsTotal = 0;
    let routesDone = 0;
    let modulesDone = 0;
    let stepsDone = 0;

    routes.forEach((route) => {
        const modules = modulesByRoute[route.id] || [];
        if (!modules.length) return;

        modulesTotal += modules.length;
        if (isRouteDone(route.id)) routesDone += 1;

        modules.forEach((mod) => {
            const steps = stepsByModule[mod.id] || [];
            stepsTotal += steps.length;
            if (steps.length && isModuleDone(route.id, mod.id)) modulesDone += 1;
            steps.forEach((step) => {
                if (isStepDone(route.id, mod.id, step.id)) stepsDone += 1;
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
        xp: typeof getXpProgress === 'function'
            ? getXpProgress()
            : { done: 0, total: 0 }
    };
};
