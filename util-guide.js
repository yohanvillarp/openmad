window.App = window.App || {};

window.App.driveIconSvg = function () {
    return `
    <svg class="drive-icon" viewBox="0 0 87.3 78" aria-hidden="true" focusable="false">
      <path fill="#0066da" d="M6.6 66.85 10.45 73.5c.8 1.4 1.95 2.5 3.3 3.3L27.5 53H0c0 1.55.4 3.1 1.2 4.5z"/>
      <path fill="#00ac47" d="M43.65 25 29.9 1.2C28.55 2 27.4 3.1 26.6 4.5L1.2 48.5A9.06 9.06 0 0 0 0 53h27.5z"/>
      <path fill="#ea4335" d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.75l5.85 11.1z"/>
      <path fill="#00832d" d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2z"/>
      <path fill="#2684fc" d="M59.8 53H27.5L13.75 76.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"/>
      <path fill="#ffba00" d="M73.4 26.5 60.7 4.5C59.9 3.1 58.75 2 57.4 1.2L43.65 25l16.15 28H87.25c0-1.55-.4-3.1-1.2-4.5z"/>
    </svg>
  `;
};

window.App.stepHasGuide = function (step) {
    const item = step || {};
    const guide = item.guide || {};
    return !!(
        item.downloadUrl ||
        item.driveUrl ||
        guide.downloadUrl ||
        guide.driveUrl ||
        guide.whatsapp ||
        guide.email ||
        (guide.files && guide.files.length) ||
        (guide.keys && guide.keys.length) ||
        (guide.sections && guide.sections.length)
    );
};
