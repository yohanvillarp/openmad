import { renderHome } from './pages/home.js';
import { renderRoutes } from './pages/routes.js';
import { renderConcepts } from './pages/concepts.js';
import { renderProfile } from './pages/profile.js';
import { renderFaq } from './pages/faq.js';
import { renderContact } from './pages/contact.js';
import { flushProgressReveal } from './utils/progress-actions.js';
import { updateNavbarActive } from './components/navbar.js';
import './components/footer.js';

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
        '#faq': 'faq',
        '#contacto': 'contacto'
    };

    const renderFunctions = {
        home: renderHome,
        rutas: renderRoutes,
        conceptos: renderConcepts,
        perfil: renderProfile,
        faq: renderFaq,
        contacto: renderContact
    };

    function router() {
        window.scrollTo(0, 0);
        const hash = (window.location.hash || '#home').split('?')[0];
        const routeKey = routes[hash] || 'home';

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
            routeKey === 'contacto' ||
            !currentView.hasChildNodes()
        )) {
            renderPage(currentView);
        }

        Array.from(app.children).forEach(child => {
            child.style.display = (child === currentView) ? 'block' : 'none';
        });

        if (typeof flushProgressReveal === 'function') {
            flushProgressReveal();
        }

        if (typeof updateNavbarActive === 'function') {
            updateNavbarActive();
        }

        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons({ root: currentView });
        }
    }

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.copy-btn');
        if (btn) {
            e.preventDefault();
            e.stopPropagation();
            const targetId = btn.getAttribute('data-copy-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                navigator.clipboard.writeText(targetEl.innerText).then(() => {
                    btn.classList.add('is-copied');
                    btn.setAttribute('aria-label', 'Mensaje copiado');
                    btn.setAttribute('title', 'Copiado');

                    setTimeout(() => {
                        btn.classList.remove('is-copied');
                        btn.setAttribute('aria-label', 'Copiar mensaje');
                        btn.setAttribute('title', 'Copiar mensaje');
                    }, 2000);
                });
            }
            return;
        }
    });

    window.addEventListener('hashchange', router);

    router();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}