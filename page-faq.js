window.App = window.App || {};

window.App.renderFaq = function (container) {
    const faqs = (window.App.mocks && window.App.mocks.faqs) || [];
    const items = faqs
        .map((item, index) => window.App.renderFaqItem(item, index === 0))
        .join('');

    container.innerHTML = `
    <section class="page page--faq">
      <header class="faq-intro">
        <h1 class="faq-intro__title">Preguntas frecuentes</h1>
      </header>
      <div class="faq-list">
        ${items}
      </div>
    </section>
  `;
};
