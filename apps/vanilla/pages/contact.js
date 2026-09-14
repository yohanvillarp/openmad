import { renderButton } from '../components/button.js';
import { faculties } from '../mocks/careers.js';

const WHATSAPP_NUMBER = '51900516057';
const WHATSAPP_MESSAGE = [
    'Hola, te contacto desde OpenMad.',
].join(' ');

function facultyOptions() {
    return faculties
        .map((faculty) => `<option value="${faculty.label}">${faculty.label}</option>`)
        .join('');
}

export function renderContact(container) {
    const siteKey = import.meta.env.VITE_PAGECLIP_SITE_KEY || 'fY0b158yF2PsTT90FruQdJ5E0mzGZ6aG';
    const actionUrl = `https://send.pageclip.co/${siteKey}/default`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

    container.innerHTML = `
    <section class="page page--contacto">
      <header class="contact-intro">
        <p class="contact-intro__eyebrow">Soporte y sugerencias</p>
        <h1 class="contact-intro__title">Contacto</h1>
        <p class="page__lead" style="color: var(--neutral-600); max-width: 650px;">
          Ayúdanos a mejorar OpenMad: reporta errores, sugiere trámites o aclara tus dudas. 
          Si es necesario, indícanos tu facultad y escuela. ¡Te responderemos pronto!
        </p>
      </header>

      <div class="contact-layout">
        <article class="contact-card">
          <h2 class="contact-card__title">Enviar un mensaje</h2>
          <p class="contact-card__help">Los campos con asterisco son obligatorios. Facultad y escuela son opcionales.</p>

          <form action="${actionUrl}" class="pageclip-form contact-form" method="post">
            <div class="contact-form__row">
              <div class="contact-form__field">
                <label for="name">Nombre</label>
                <input type="text" name="name" id="name" placeholder="Tu nombre" autocomplete="name" />
              </div>

              <div class="contact-form__field">
                <label for="email">Correo <span aria-hidden="true">*</span></label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="correo@ejemplo.com"
                  autocomplete="email"
                />
              </div>
            </div>

            <div class="contact-form__row">
              <div class="contact-form__field">
                <label for="faculty">Facultad</label>
                <select name="faculty" id="faculty">
                  <option value="">Selecciona una facultad</option>
                  ${facultyOptions()}
                </select>
              </div>

              <div class="contact-form__field">
                <label for="school">Escuela profesional</label>
                <select name="school" id="school" disabled>
                  <option value="">Primero elige una facultad</option>
                </select>
              </div>
            </div>

            <div class="contact-form__field">
              <label for="subject">Asunto <span aria-hidden="true">*</span></label>
              <input
                type="text"
                name="subject"
                id="subject"
                required
                placeholder="Error, sugerencia o aporte de un trámite"
              />
            </div>

            <div class="contact-form__field">
              <label for="body">Mensaje <span aria-hidden="true">*</span></label>
              <textarea
                name="body"
                id="body"
                required
                rows="6"
                placeholder="Describe tu consulta con el mayor detalle posible."
              ></textarea>
            </div>

            <button type="submit" class="pageclip-form__submit btn btn--square btn--navy">
              <span class="btn__label">Enviar mensaje</span>
              <i data-lucide="send"></i>
            </button>
          </form>
        </article>

        <aside class="contact-aside">
          <article class="contact-whatsapp">
            <span class="contact-whatsapp__icon" aria-hidden="true">
              <i data-lucide="message-circle"></i>
            </span>
            <h2>WhatsApp</h2>
            <p>
              Si prefieres escribir ahora, abre una conversación con un mensaje
              inicial sobre OpenMad.
            </p>
            ${renderButton({
                href: whatsappUrl,
                label: 'Escribir por WhatsApp',
                icon: 'send',
                variant: 'primary'
            })}
          </article>
        </aside>
      </div>
    </section>
  `;

    const facultySelect = container.querySelector('#faculty');
    const schoolSelect = container.querySelector('#school');

    facultySelect.addEventListener('change', () => {
        const faculty = faculties.find((item) => item.label === facultySelect.value);

        schoolSelect.innerHTML = faculty
            ? `<option value="">Selecciona una escuela</option>${faculty.schools
                .map((school) => `<option value="${school}">${school}</option>`)
                .join('')}`
            : '<option value="">Primero elige una facultad</option>';

        schoolSelect.disabled = !faculty;
        schoolSelect.value = '';
    });

    const whatsappLink = container.querySelector('.contact-whatsapp a.btn');
    if (whatsappLink) {
        whatsappLink.setAttribute('target', '_blank');
        whatsappLink.setAttribute('rel', 'noopener noreferrer');
    }

    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
        lucide.createIcons({ nameAttr: 'data-lucide', root: container });
    }

    const form = container.querySelector('.pageclip-form');
    if (form && window.Pageclip) {
        window.Pageclip.form(form, {
            onSubmit: function (event) { },
            onResponse: function (error, response) {
                if (!error) {
                    form.reset();
                    schoolSelect.disabled = true;
                    schoolSelect.innerHTML = '<option value="">Primero elige una facultad</option>';
                }
            },
            successTemplate: '<span>¡Mensaje enviado con éxito!</span>'
        });
    }
}
