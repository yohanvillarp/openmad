
/**
 * @param {{ id?: string, question: string, answer: string }} item
 * @param {boolean} open
 * @returns {string}
 */
export function renderFaqItem (item, open) {
    const question = item.question || '';
    const answer = item.answer || '';

    return `
    <details class="faq-item"${open ? ' open' : ''}>
      <summary class="faq-item__question">${question}</summary>
      <p class="faq-item__answer">${answer}</p>
    </details>
  `;
};
