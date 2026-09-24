import { faqs } from '../mocks/faq.js';
import { renderFaqItem } from '../components/faq-item.js';


export function renderFaq (container) {
        const items = faqs
        .map((item, index) => renderFaqItem(item, index === 0))
        .join('');

    container.innerHTML = `
    <section class="page page--faq">
      <header class="faq-intro">
        <h1 class="faq-intro__title">Preguntas frecuentes sobre trámites en la UNAMAD</h1>
      </header>
      <div class="faq-list">
        ${items}
      </div>
    </section>
  `;
};
