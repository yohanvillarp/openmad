window.App = window.App || {};

function getSelectedConcept() {
    const query = (window.location.hash.split('?')[1] || '');
    const conceptId = new URLSearchParams(query).get('termino') || 'ruta';
    const concepts = (window.App.mocks && window.App.mocks.concepts) || [];
    return concepts.find((concept) => concept.id === conceptId) || concepts[0];
}

window.App.renderConcepts = function (container) {
    const concepts = (window.App.mocks && window.App.mocks.concepts) || [];
    const selected = getSelectedConcept();

    if (!selected) {
        container.innerHTML = '<section class="page"><p>No hay conceptos disponibles.</p></section>';
        return;
    }

    const tabs = concepts.map((concept) => `
      <a
        class="concept-tabs__item${concept.id === selected.id ? ' concept-tabs__item--active' : ''}"
        href="#conceptos?termino=${encodeURIComponent(concept.id)}"
        ${concept.id === selected.id ? 'aria-current="page"' : ''}
      >
        <span class="${concept.icon}" aria-hidden="true"></span>
        <span>${concept.label}</span>
      </a>
    `).join('');

    const examples = selected.examples
        .map((example) => `<li>${example}</li>`)
        .join('');

    container.innerHTML = `
    <section class="page page--concepts">
      <nav class="concept-tabs" aria-label="Conceptos de OpenMad">
        ${tabs}
      </nav>

      <div class="concept-detail">
        <div class="concept-detail__visual" aria-hidden="true">
          <span
            class="concept-detail__shape concept-detail__shape--${selected.id}"
            style="--concept-color:${selected.color}"
          ></span>
        </div>

        <article class="concept-detail__content">
          <p class="concept-detail__eyebrow">Conceptos de OpenMad</p>
          <h1>${selected.label}</h1>
          <p class="concept-detail__definition">${selected.definition}</p>
          <h2>Casos de uso en OpenMad</h2>
          <ul>${examples}</ul>
        </article>
      </div>
    </section>
  `;
};
