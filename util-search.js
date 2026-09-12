window.App = window.App || {};

window.App.normalizeSearchText = function (value) {
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

window.App.buildSearchIndex = function () {
    const routes = (window.App.mocks && window.App.mocks.routes) || [];
    const modulesByRoute = (window.App.mocks && window.App.mocks.modulesByRoute) || {};
    const stepsByModule = (window.App.mocks && window.App.mocks.stepsByModule) || {};
    const index = [];

    routes.forEach((route) => {
        index.push({
            type: 'Ruta',
            icon: 'icon-ruta',
            label: route.label,
            summary: route.summary || '',
            context: 'Rutas',
            href: `#rutas?ruta=${encodeURIComponent(route.id)}`,
            routeId: route.id,
            extra: ''
        });

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

window.App.rankSearchItem = function (item, query) {
    const label = window.App.normalizeSearchText(item.label);
    const summary = window.App.normalizeSearchText(item.summary);
    const context = window.App.normalizeSearchText(item.context);
    const extra = window.App.normalizeSearchText(item.extra);
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

window.App.isSearchItemLocked = function (item) {
    if (item.type === 'Ruta') return window.App.isRouteLocked(item.routeId);
    if (item.type === 'Módulo') return window.App.isModuleLocked(item.routeId, item.moduleId);
    return window.App.isStepLocked(item.routeId, item.moduleId, item.stepId);
};
