import { getStepTaskDefinitions, getStepTaskProgress, isStepTaskDone } from '../utils/progress-tasks.js';
import { renderMiniTask } from './mini-task.js';
import { renderCareerTable } from './route-requirements.js';
import { driveIconSvg } from '../utils/guide.js';


/**
 * @param {object} step
 * @param {{ routeId?: string, moduleId?: string, stepId?: string }} options
 * @returns {string}
 */
export function renderTemplateGuide (step, options) {
    const item = step || {};
    const opts = options || {};
    const guide = item.guide || {};
    const downloadUrl = guide.downloadUrl || item.downloadUrl || '';
    const driveUrl = guide.driveUrl || item.driveUrl || '';
    const files = guide.files || [];
    const keys = guide.keys || [];
    const sections = guide.sections || [];
    const infoPanels = guide.infoPanels || [];
    const fileDownloads = files.filter((file) => file.downloadUrl);
    const namedFiles = files.filter((file) => file.label && !file.downloadUrl);
    const taskDefinitions = getStepTaskDefinitions(opts.moduleId, opts.stepId);
    const taskProgress = getStepTaskProgress(opts.routeId, opts.moduleId, opts.stepId);
    let taskIndex = 0;

    function renderNextTask() {
        const task = taskDefinitions[taskIndex];
        taskIndex += 1;
        if (!task) return '';
        return renderMiniTask({
            routeId: opts.routeId,
            moduleId: opts.moduleId,
            stepId: opts.stepId,
            taskId: task.id,
            code: task.code,
            text: task.text,
            items: task.items,
            copyBox: task.copyBox,
            reference: task.reference,
            done: isStepTaskDone(opts.routeId, opts.moduleId, opts.stepId, task.id)
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
    const emailLabel = guide.emailLabel || '';
    const emailBtn = (email || emailLabel)
        ? `<${email ? `a href="mailto:${email}"` : `button type="button"`} class="btn btn--square btn--navy">
            <span class="btn__label" style="text-align: center; line-height: 1.3;">${emailLabel || 'Abrir correo'}</span>
          </${email ? 'a' : 'button'}>`
        : '';

    const hasAside = !!(downloadUrl || driveUrl || fileDownloads.length || namedFiles.length || whatsapp || email || emailLabel);
    const asideIcon = (downloadUrl || driveUrl || fileDownloads.length)
        ? driveIconSvg()
        : '';

    const rows = keys
        .map(() => renderNextTask())
        .join('');

    const infoPanelList = infoPanels
        .map((panel) => `
          <section class="guide-info-panel" id="${panel.id}" aria-labelledby="${panel.id}-title" hidden>
            <header class="guide-info-panel__header">
              <p>${panel.eyebrow || 'Información relacionada'}</p>
              <h3 id="${panel.id}-title">${panel.title || ''}</h3>
              ${panel.intro ? `<span>${panel.intro}</span>` : ''}
            </header>
            ${renderCareerTable(panel.table, panel.id)}
          </section>
        `)
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
              ? `<span class="template-guide__task-progress">${taskProgress.done}/${taskProgress.total} tareas</span>`
              : ''}
        </div>
        ${guide.intro ? `<p class="template-guide__intro">${guide.intro}</p>` : ''}
        ${rows ? `<div class="template-guide__table">${rows}</div>` : ''}
        ${infoPanelList ? `<div class="guide-info-panels">${infoPanelList}</div>` : ''}
        ${sectionList ? `<div class="template-guide__sections">${sectionList}</div>` : ''}
        ${guide.close ? `<p class="template-guide__close">${guide.close}</p>` : ''}
      </div>
    </div>
  `;
};
