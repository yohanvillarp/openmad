window.App = window.App || {};

window.App.renderFooter = function () {
    const root = document.getElementById('footer-root');
    if (!root || root.querySelector('.footer')) return;

    root.innerHTML = `
    <footer class="footer">
      <div class="footer__inner">
        <p class="footer__legal">
          <strong>Aviso legal.</strong>
          OpenMad es un proyecto abierto, sin fines de lucro y hecho por estudiantes.
          No está afiliado ni respaldado por la UNAMAD.
          Costos (TUPA) y plantillas son referenciales; confírmalos siempre en los canales oficiales de la universidad.
        </p>
        <a
          class="footer__github"
          href="https://github.com/yohanvillarp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub de Yohan Villar"
        >
          <img src="assets/github.svg" alt="" width="24" height="24" />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  `;
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.App.renderFooter === 'function') {
        window.App.renderFooter();
    }
});
