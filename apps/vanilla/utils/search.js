import { getRouteScopeLabel, routes } from '../mocks/routes.js';
import { modulesByRoute } from '../mocks/modules.js';
import { stepsByModule } from '../mocks/steps.js';
import { isRouteLocked, isModuleLocked, isStepLocked } from './progress-status.js';


export function normalizeSearchText (value) {
    return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};

function flattenSearchValue(value) {
    if (typeof value === 'string' || typeof value === 'number') return String(value);
    if (Array.isArray(value)) return value.map(flattenSearchValue).join(' ');
    if (value && typeof value === 'object') {
        return Object.values(value).map(flattenSearchValue).join(' ');
    }
    return '';
}

export function buildSearchIndex () {
    const index = [];

    routes.forEach((route) => {
        index.push({
            type: 'Ruta',
            icon: 'icon-ruta',
            label: route.label,
            summary: route.summary || '',
            context: getRouteScopeLabel(route),
            href: `#rutas?ruta=${encodeURIComponent(route.id)}`,
            routeId: route.id,
            extra: getRouteScopeLabel(route)
        });

        if (route.requirements) {
            index.push({
                type: 'Información',
                icon: 'icon-modulo',
                label: route.requirements.label,
                summary: route.requirements.summary || '',
                context: route.label,
                href: `#rutas?ruta=${encodeURIComponent(route.id)}&modulo=${encodeURIComponent(route.requirements.id)}`,
                routeId: route.id,
                moduleId: route.requirements.id,
                extra: flattenSearchValue(route.requirements.items || [])
            });
        }

        (modulesByRoute[route.id] || []).forEach((mod) => {
            index.push({
                type: 'Módulo',
                icon: 'icon-modulo',
                label: mod.label,
                summary: mod.summary || '',
                context: route.label,
                href: `#rutas?ruta=${encodeURIComponent(route.id)}&modulo=${encodeURIComponent(mod.id)}`,
                routeId: route.id,
                moduleId: mod.id,
                extra: ''
            });

            (stepsByModule[mod.id] || []).forEach((step) => {
                index.push({
                    type: 'Paso',
                    icon: 'icon-paso',
                    label: step.label,
                    summary: step.summary || '',
                    context: `${route.label} · ${mod.label}`,
                    href: `#rutas?ruta=${encodeURIComponent(route.id)}&modulo=${encodeURIComponent(mod.id)}&paso=${encodeURIComponent(step.id)}`,
                    routeId: route.id,
                    moduleId: mod.id,
                    stepId: step.id,
                    extra: flattenSearchValue(step.guide || {})
                });
            });
        });
    });

    return index;
};

export function rankSearchItem (item, query) {
    const label = normalizeSearchText(item.label);
    const summary = normalizeSearchText(item.summary);
    const context = normalizeSearchText(item.context);
    const extra = normalizeSearchText(item.extra);
    const all = `${label} ${summary} ${context} ${extra}`;
    const tokens = query.split(' ').filter(Boolean);

    if (!tokens.every((token) => all.includes(token))) return -1;

    let score = 0;
    if (label === query) score += 120;
    else if (label.startsWith(query)) score += 90;
    else if (label.includes(query)) score += 65;

    tokens.forEach((token) => {
        if (label.startsWith(token)) score += 24;
        else if (label.includes(token)) score += 16;
        if (summary.includes(token)) score += 8;
        if (context.includes(token)) score += 5;
        if (extra.includes(token)) score += 2;
    });

    if (item.type === 'Paso') score += 3;
    return score;
};

export function isSearchItemLocked (item) {
    if (item.type === 'Ruta') return isRouteLocked(item.routeId);
    if (item.type === 'Módulo') return isModuleLocked(item.routeId, item.moduleId);
    return isStepLocked(item.routeId, item.moduleId, item.stepId);
};
