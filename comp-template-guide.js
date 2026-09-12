window.App = window.App || {};

/**
 * @param {object} step
 * @param {{ routeId?: string, moduleId?: string, stepId?: string }} options
 * @returns {string}
 */
window.App.renderTemplateGuide = function (step, options) {
    const item = step || {};
    const opts = options || {};
    const guide = item.guide || {};
    const downloadUrl = guide.downloadUrl || item.downloadUrl || '';
    const driveUrl = guide.driveUrl || item.driveUrl || '';
    const files = guide.files || [];
    const keys = guide.keys || [];
    const sections = guide.sections || [];
    const fileDownloads = files.filter((file) => file.downloadUrl);
    const namedFiles = files.filter((file) => file.label && !file.downloadUrl);
    const taskDefinitions = window.App.getStepTaskDefinitions(opts.moduleId, opts.stepId);
    const taskProgress = window.App.getStepTaskProgress(opts.routeId, opts.moduleId, opts.stepId);
    let taskIndex = 0;

    function renderNextTask() {
        const task = taskDefinitions[taskIndex];
        taskIndex += 1;
        if (!task) return '';
        return window.App.renderMiniTask({
            routeId: opts.routeId,
            moduleId: opts.moduleId,
            stepId: opts.stepId,
            taskId: task.id,
            code: task.code,
            text: task.text,
            done: window.App.isStepTaskDone(opts.routeId, opts.moduleId, opts.stepId, task.id)
        });
    }

    const fileDownloadBtns = fileDownloads
        .map((file) => `
        <a class="btn btn--square btn--navy" href="${file.downloadUrl}" rel="noopener noreferrer">
          <span class="btn__label">Descargar ${file.label}</span>
        </a>
      `)
        .join('');

    const singleDownload = !fileDownloads.length && downloadUrl
        ? `<a class="btn btn--square btn--navy" href="${downloadUrl}" rel="noopener noreferrer">
            <span class="btn__label">${guide.downloadLabel || 'Descargar'}</span>
          </a>`
        : '';

    const fileList = namedFiles.length
        ? `<ul class="template-guide__files">
            ${namedFiles.map((file) => `<li>${file.label}</li>`).join('')}
          </ul>`
        : '';

    const driveBtn = driveUrl
        ? `<a class="btn btn--square btn--ghost" href="${driveUrl}" target="_blank" rel="noopener noreferrer">
            <span class="btn__label">${guide.driveLabel || 'Ver en Drive'}</span>
          </a>`
        : '';

    const whatsapp = (guide.whatsapp || '').replace(/\D/g, '');
    const whatsappBtn = whatsapp
        ? `<a class="btn btn--square btn--navy" href="https://wa.me/${whatsapp}" target="_blank" rel="noopener noreferrer">
            <span class="btn__label">${guide.whatsappLabel || 'WhatsApp'}</span>
          </a>`
        : '';

    const email = guide.email || '';
    const emailBtn = email
        ? `<a class="btn btn--square btn--navy" href="mailto:${email}">
            <span class="btn__label">${guide.emailLabel || 'Abrir correo'}</span>
          </a>`
        : '';

    const hasAside = !!(downloadUrl || driveUrl || fileDownloads.length || namedFiles.length || whatsapp || email);
    const asideIcon = (downloadUrl || driveUrl || fileDownloads.length)
        ? window.App.driveIconSvg()
        : '';

    const rows = keys
        .map(() => renderNextTask())
        .join('');

    const sectionList = sections
        .map((section) => `
        <section class="template-guide__section">
          <h3>${section.title || ''}</h3>
          <ul>
            ${(section.items || []).map(() => `<li>${renderNextTask()}</li>`).join('')}
          </ul>
        </section>
      `)
        .join('');

    const aside = hasAside
        ? `<div class="template-guide__download">
        ${asideIcon}
        <p class="template-guide__hint">${guide.hint || ''}</p>
        ${fileList}
        ${fileDownloadBtns}
        ${singleDownload}
        ${driveBtn}
        ${whatsappBtn}
        ${emailBtn}
      </div>`
        : '';

    return `
    <div class="template-guide${hasAside ? '' : ' template-guide--solo'}">
      ${aside}
      <div class="template-guide__keys">
        <div class="template-guide__heading-row">
          <h2 class="template-guide__heading">${guide.heading || 'Cómo usarlo'}</h2>
          ${taskProgress.total
              ? `<span class="template-guide__task-progress">${taskProgress.done}/${taskProgress.total} mini tareas</span>`
              : ''}
        </div>
        ${guide.intro ? `<p class="template-guide__intro">${guide.intro}</p>` : ''}
        ${rows ? `<div class="template-guide__table">${rows}</div>` : ''}
        ${sectionList ? `<div class="template-guide__sections">${sectionList}</div>` : ''}
        ${guide.close ? `<p class="template-guide__close">${guide.close}</p>` : ''}
      </div>
    </div>
  `;
};
