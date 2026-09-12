window.App = window.App || {};

function initApp() {
    const app = document.getElementById('app');
    if (!app) return;

    const viewCache = {};

    const routes = {
        '': 'home',
        '#home': 'home',
        '#rutas': 'rutas',
        '#guia': 'rutas',
        '#conceptos': 'conceptos',
        '#perfil': 'perfil',
        '#faq': 'faq'
    };

    const renderFunctions = {
        home: window.App.renderHome,
        rutas: window.App.renderRoutes,
        conceptos: window.App.renderConcepts,
        perfil: window.App.renderProfile,
        faq: window.App.renderFaq
    };

    function router() {
        const hash = (window.location.hash || '#home').split('?')[0];
        const routeKey = routes[hash] || 'home';
        document.body.classList.toggle('page-current-faq', routeKey === 'faq');

        let currentView = viewCache[routeKey];

        if (!currentView) {
            currentView = document.createElement('div');
            currentView.className = `view-section view-${routeKey}`;
            viewCache[routeKey] = currentView;
            app.appendChild(currentView);
        }

        const renderPage = renderFunctions[routeKey];
        if (typeof renderPage === 'function' && (
            routeKey === 'rutas' ||
            routeKey === 'conceptos' ||
            routeKey === 'perfil' ||
            !currentView.hasChildNodes()
        )) {
            renderPage(currentView);
        }

        Array.from(app.children).forEach(child => {
            child.style.display = (child === currentView) ? 'block' : 'none';
        });

        if (typeof window.App.flushProgressReveal === 'function') {
            window.App.flushProgressReveal();
        }

        if (typeof window.App.updateNavbarActive === 'function') {
            window.App.updateNavbarActive();
        }
    }

    window.addEventListener('hashchange', router);

    router();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}