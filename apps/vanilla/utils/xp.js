import { getModuleSteps, getRouteModules, isStepDone } from './progress.js';
import { routes } from '../mocks/routes.js';
import { isRouteDone, isModuleDone } from './progress-status.js';


export const XP_PASO = 10;
export const XP_POR_PASO_EN_MODULO = 20;
export const XP_POR_MODULO_EN_RUTA = 50;

export function getStepXp () {
    return XP_PASO;
};

export function getModuleXp (routeId, moduleItem) {
    const item = moduleItem || {};
    const count = getModuleSteps(item.id || '').length;
    return XP_POR_PASO_EN_MODULO * count;
};

export function getRouteXp (route) {
    const item = route || {};
    const count = getRouteModules(item.id || '').length;
    return XP_POR_MODULO_EN_RUTA * count;
};

export function formatXp (value) {
    return `${value || 0} XP`;
};

export function getXpProgress () {
        let earned = 0;
    let total = 0;

    routes.forEach((route) => {
        const routeXp = getRouteXp(route);
        total += routeXp;
        if (isRouteDone(route.id)) earned += routeXp;

        getRouteModules(route.id).forEach((mod) => {
            const moduleXp = getModuleXp(route.id, mod);
            total += moduleXp;
            if (isModuleDone(route.id, mod.id)) earned += moduleXp;

            getModuleSteps(mod.id).forEach((step) => {
                const stepXp = getStepXp();
                total += stepXp;
                if (isStepDone(route.id, mod.id, step.id)) earned += stepXp;
            });
        });
    });

    return { done: earned, total: total };
};
