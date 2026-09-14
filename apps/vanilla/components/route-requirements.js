function renderRequirementValue(cell) {
    if (!cell || (
        (cell.credits === undefined || cell.credits === null) &&
        !cell.value
    )) {
        return '<span class="requirements-table__missing">No especificado</span>';
    }

    const note = cell.note
        ? `<span class="requirements-table__note">${cell.note}</span>`
        : '';

    const value = cell.value || `${cell.credits} créditos`;

    return `
      <strong class="requirements-table__credits">${value}</strong>
      ${note}
    `;
}

function getColumnLabel(table, columnId) {
    const column = table.columns.find((item) => item.id === columnId);
    return column ? column.label : '';
}

export function renderCareerTable(table, requirementId) {
    if (!table || !Array.isArray(table.columns) || !Array.isArray(table.rows)) return '';

    const headers = table.columns
        .map((column) => `<th scope="col">Créditos aprobados<br>${column.label}</th>`)
        .join('');
    const filters = table.rows
        .map((row) => `
          <button type="button" data-career-filter="${row.id}" aria-pressed="false">
            ${row.shortLabel || row.career}
          </button>
        `)
        .join('');
    const hasMissingValues = table.rows.some((row) => (
        (row.cells || []).some((cell) => (
            (cell.credits === undefined || cell.credits === null) && !cell.value
        ))
    ));
    const rows = table.rows
        .map((row) => {
            const cells = (row.cells || [])
                .map((cell) => {
                    const span = Array.isArray(cell.columns) ? cell.columns.length : 1;
                    const label = cell.label || getColumnLabel(table, cell.column);
                    return `
                  <td data-label="${label}"${span > 1 ? ` colspan="${span}"` : ''}>
                    ${renderRequirementValue(cell)}
                  </td>
                `;
                })
                .join('');

            return `
              <tr data-career-row="${row.id}">
                <th scope="row">${row.career}</th>
                ${cells}
              </tr>
            `;
        })
        .join('');

    return `
      <div class="requirements-filter" role="group" aria-label="Filtrar por carrera profesional">
        <span class="requirements-filter__label">Ver carrera:</span>
        <div class="requirements-filter__buttons">
          <button type="button" data-career-filter="all" aria-pressed="true">Todas</button>
          ${filters}
        </div>
        <span class="requirements-filter__status" aria-live="polite">Mostrando todas las carreras</span>
      </div>
      <div class="requirements-table-wrap">
        <table class="requirements-table" id="requirements-${requirementId}">
          <caption>${table.caption || 'Requisitos por carrera profesional'}</caption>
          <thead>
            <tr>
              <th scope="col">Carrera profesional</th>
              ${headers}
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      ${hasMissingValues
          ? `<p class="route-requirements__note">
              <i data-lucide="info" aria-hidden="true"></i>
              “No especificado” indica que ese dato no aparece en la información recibida.
            </p>`
          : ''}
    `;
}

export function renderRouteRequirements(requirements) {
    if (!Array.isArray(requirements) || requirements.length === 0) return '';

    const items = requirements
        .map((requirement) => `
          <article class="route-requirement">
            <header class="route-requirement__heading">
              <span class="route-requirement__icon" aria-hidden="true">
                <i data-lucide="badge-check"></i>
              </span>
              <div>
                <p>Consulta informativa</p>
                <h2>${requirement.title || 'Requisitos previos'}</h2>
              </div>
            </header>
            <p class="route-requirement__description">${requirement.text || ''}</p>
            ${renderCareerTable(requirement.table, requirement.id || 'table')}
          </article>
        `)
        .join('');

    return `
      <section class="route-requirements" aria-label="Requisitos previos">
        <div class="route-requirements__list">${items}</div>
      </section>
    `;
}

export function bindCareerTables(container) {
    if (!container) return;

    container.querySelectorAll('.route-requirement').forEach((requirement) => {
        const buttons = Array.from(requirement.querySelectorAll('[data-career-filter]'));
        const rows = Array.from(requirement.querySelectorAll('[data-career-row]'));
        const status = requirement.querySelector('.requirements-filter__status');

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const selected = button.dataset.careerFilter;
                buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
                rows.forEach((row) => {
                    row.hidden = selected !== 'all' && row.dataset.careerRow !== selected;
                });

                if (status) {
                    status.textContent = selected === 'all'
                        ? 'Mostrando todas las carreras'
                        : `Mostrando: ${button.textContent.trim()}`;
                }
            });
        });
    });
}

export function bindRouteRequirements(container) {
    bindCareerTables(container);
}
