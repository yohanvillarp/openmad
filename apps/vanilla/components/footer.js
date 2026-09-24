
export function renderFooter () {
    const root = document.getElementById('footer-root');
    if (!root || root.querySelector('.footer')) return;

    const year = new Date().getFullYear();

    root.innerHTML = `
    <footer class="footer">
      <div class="footer__inner">
        <div class="footer__top">
          <div class="footer__brand">
            <img src="assets/logo_openmad.png" alt="" class="footer__logo" width="28" height="28" />
            <span class="footer__name">OpenMad</span>
          </div>
          <nav class="footer__links" aria-label="Enlaces del pie de página">
            <a href="#faq" class="footer__link">
              <i data-lucide="circle-help"></i>
              FAQ
            </a>
            <a href="#contacto" class="footer__link footer__link--highlight">
              <i data-lucide="message-circle"></i>
              Contacto
            </a>
            <a
              href="https://github.com/yohanvillarp/openmad"
              class="footer__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="assets/github.svg" alt="" width="16" height="16" />
              GitHub
            </a>
          </nav>
        </div>
        <div class="footer__bottom">
          <p class="footer__legal">
            <strong>Aviso.</strong>
            OpenMad es una iniciativa estudiantil independiente y sin fines de lucro. 
            Nuestras guías se basan en experiencias reales y procesos verificados por estudiantes, pero no contamos con respaldo oficial de la UNAMAD. 
            Te sugerimos usar esto como tu mapa principal y confirmar siempre los detalles finales en las oficinas correspondientes.
          </p>
          <p class="footer__copy">&copy; ${year} OpenMad. Proyecto de código abierto.</p>
        </div>
      </div>
    </footer>
  `;

    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
        lucide.createIcons({ nameAttr: 'data-lucide', root });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    renderFooter();
});
