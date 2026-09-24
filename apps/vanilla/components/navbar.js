import { renderSearch } from './search.js';
import { renderProgress } from './progress.js';

/**
 * Navbar Component - OpenMad
 * Se construye una sola vez; el estado activo y el menú móvil se actualizan sin re-montar.
 */


const NAVBAR_MQ = '(max-width: 840px)';
let navbarEventsBound = false;

function getNavbarEl() {
    return document.querySelector('#navbar-root .navbar');
}

export function setNavbarOpen (open) {
    const navbar = getNavbarEl();
    const toggle = navbar && navbar.querySelector('.navbar__toggle');
    if (!navbar || !toggle) return;

    navbar.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('navbar-lock', open);
};

export function updateNavbarActive () {
    const navbar = getNavbarEl();
    if (!navbar) return;

    const currentHash = (window.location.hash || '#home').split('?')[0];

    navbar.querySelectorAll('.navbar__link').forEach((link) => {
        const href = (link.getAttribute('href') || '').split('?')[0];
        link.classList.toggle('navbar__link--active', href === currentHash);
        if (href === currentHash) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });

    if (window.matchMedia(NAVBAR_MQ).matches) {
        setNavbarOpen(false);
    }
};

export function renderNavbar () {
    const container = document.getElementById('navbar-root');
    if (!container) return;

    if (!container.querySelector('.navbar')) {
        container.innerHTML = `
    <header class="navbar">
      <a href="#home" class="navbar__brand" title="Inicio">
        <img
          src="assets/logo_openmad.png"
          alt=""
          class="navbar__logo-img"
          width="36"
          height="36"
        />
        <span class="navbar__logo-text">OpenMad</span>
        <span class="navbar__beta">Beta</span>
      </a>

      <button
        type="button"
        class="navbar__toggle"
        aria-controls="navbar-panel"
        aria-expanded="false"
        aria-label="Abrir menú"
      >
        <span class="navbar__toggle-bar" aria-hidden="true"></span>
        <span class="navbar__toggle-bar" aria-hidden="true"></span>
        <span class="navbar__toggle-bar" aria-hidden="true"></span>
      </button>

      <div class="navbar__panel" id="navbar-panel">
        <div class="navbar__search-container" id="navbar-search"></div>
        <nav class="navbar__nav" aria-label="Secciones">
          <a href="#rutas" class="navbar__link" title="Rutas de trámites">
            <span class="icon-ruta" aria-hidden="true"></span>
            <span>Rutas</span>
          </a>
          <a href="#conceptos" class="navbar__link" title="Glosario de conceptos">
            <i data-lucide="shapes"></i>
            <span>Conceptos</span>
          </a>
          <a href="#faq" class="navbar__link" title="Preguntas frecuentes">
            <i data-lucide="help-circle"></i>
            <span>FAQ</span>
          </a>
          <a href="#perfil" class="navbar__link navbar__link--cta" title="Tu perfil y progreso">
            <i data-lucide="user-round"></i>
            <span>Perfil</span>
          </a>
        </nav>
      </div>

      <button type="button" class="navbar__backdrop" tabindex="-1" aria-label="Cerrar menú"></button>
    </header>
  `;

        if (typeof renderSearch === 'function') {
            renderSearch('navbar-search');
        }

        if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
            lucide.createIcons({ nameAttr: 'data-lucide' });
        }
    }

    if (typeof renderProgress === 'function') {
        renderProgress();
    }

    updateNavbarActive();

    if (!navbarEventsBound) {
        navbarEventsBound = true;
        bindNavbarEvents();
    }
};

function bindNavbarEvents() {
    const navbar = getNavbarEl();
    if (!navbar) return;

    const toggle = navbar.querySelector('.navbar__toggle');
    const backdrop = navbar.querySelector('.navbar__backdrop');

    toggle.addEventListener('click', () => {
        setNavbarOpen(!navbar.classList.contains('is-open'));
    });

    backdrop.addEventListener('click', () => {
        setNavbarOpen(false);
    });

    navbar.querySelectorAll('.navbar__link, .navbar__brand').forEach((el) => {
        el.addEventListener('click', () => {
            if (window.matchMedia(NAVBAR_MQ).matches) {
                setNavbarOpen(false);
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setNavbarOpen(false);
        }
    });

    window.matchMedia(NAVBAR_MQ).addEventListener('change', (event) => {
        if (!event.matches) {
            setNavbarOpen(false);
        }
    });

    window.addEventListener('hashchange', updateNavbarActive);
}

document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
});
