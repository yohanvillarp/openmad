import { renderUniBanner } from '../components/uni-banner.js';
import { renderButton } from '../components/button.js';


export function renderHome (container) {
    container.innerHTML = `
    <section class="page page--home">
      <div class="home-university">
        ${renderUniBanner({
            title: 'Para estudiantes de la UNAMAD',
            meta: 'Sitio institucional',
            href: 'https://unamad.edu.pe/'
        })}
      </div>

      <div class="hero">
        <div class="hero__copy">
          <div class="hero__meta">
            <p class="hero__badge">
              <i data-lucide="info"></i>
              Guía estudiantil no oficial
            </p>
          </div>

          <h1 class="hero__title">Sigue tus trámites paso a paso.</h1>

          <p class="hero__lead">
            OpenMad organiza cada proceso en módulos y pasos para que sepas qué hacer,
            qué documentos preparar y dónde obtenerlos. También puedes marcar tu avance
            y retomarlo después.
          </p>

          <ul class="hero__points">
            <li>
              <i data-lucide="list-checks"></i>
              Instrucciones en orden
            </li>
            <li>
              <i data-lucide="file-down"></i>
              Formatos y documentos
            </li>
            <li>
              <i data-lucide="save"></i>
              Avance guardado localmente
            </li>
          </ul>

          <div class="hero__actions">
            ${renderButton({
                href: '#rutas',
                label: 'Explorar todas las rutas',
                variant: 'navy'
            })}
            <a class="hero__secondary" href="#conceptos">Cómo funciona OpenMad</a>
          </div>

          <p class="hero__storage-note">
            <i data-lucide="hard-drive"></i>
            Tu progreso se guarda únicamente en este navegador.
          </p>
        </div>

        <div class="hero__diagram">
          <p class="hero__diagram-title">Cómo se organiza una ruta</p>
          <div class="flow">
            <div class="flow__cell">
              <span class="flow__label">Ruta</span>
              <span class="flow__shape flow__shape--diamond"></span>
            </div>
            <span class="flow__arrow flow__arrow--right"></span>
            <div class="flow__cell">
              <span class="flow__label">Módulo</span>
              <span class="flow__shape flow__shape--square"></span>
            </div>
            <span class="flow__arrow flow__arrow--up"></span>
            <span class="flow__spacer"></span>
            <span class="flow__arrow flow__arrow--down"></span>
            <div class="flow__cell">
              <span class="flow__label">Hito</span>
              <span class="flow__shape flow__shape--hex"></span>
            </div>
            <span class="flow__arrow flow__arrow--left"></span>
            <div class="flow__cell">
              <span class="flow__label">Paso</span>
              <span class="flow__shape flow__shape--circle"></span>
            </div>
          </div>
          <p class="hero__diagram-help">
            Elige una ruta, completa sus módulos y pasos, y alcanza el hito final.
          </p>
        </div>
      </div>
    </section>
  `;

    if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons({ root: container });
    }
};
