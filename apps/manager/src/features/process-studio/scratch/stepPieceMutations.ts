import type { StepItem, PalettePieceType } from '../types';

export function attachPieceToStep(step: StepItem, type: PalettePieceType): StepItem {
  if (type === 'cost') {
    return {
      ...step,
      cost: { amount: 'S/. 10.00', concept: 'Arancel de Caja', place: 'Caja UNAMAD' },
    };
  }
  if (type === 'drive') {
    return {
      ...step,
      drive: {
        title: 'Formato Oficial Drive',
        driveUrl: 'https://docs.google.com',
        downloadUrl: 'https://docs.google.com',
        isOfficial: true,
      },
    };
  }
  if (type === 'validity') {
    return {
      ...step,
      validity: { required: true, authority: 'Mesa de Partes / Decanato', deadline: '30 días hábiles' },
    };
  }
  if (type === 'alert') {
    const guide = step.guide || {
      heading: 'En este orden',
      keys: [{ code: '1', text: 'Presentar solicitud.' }],
    };
    return {
      ...step,
      guide: {
        ...guide,
        introAlert: 'IMPORTANTE: Todo este paso debe completarse dentro del plazo.',
      },
    };
  }
  if (type === 'copyBox') {
    const keys = step.guide?.keys || [{ code: '1', text: 'Enviar solicitud' }];
    const updatedKeys = [
      {
        ...keys[0],
        copyBox: {
          id: `copy-${step.id}`,
          content:
            'Mediante el presente correo solicito el trámite oficial correspondiente.\n\nEstudiante: {APELLIDOS Y NOMBRES}\nCódigo: {CÓDIGO}',
        },
      },
      ...keys.slice(1),
    ];
    return {
      ...step,
      guide: {
        heading: step.guide?.heading || 'En este orden',
        ...step.guide,
        keys: updatedKeys,
      },
    };
  }
  if (type === 'checklist') {
    const guide = step.guide || { heading: 'En este orden', keys: [{ code: '1', text: 'Revisar expediente' }] };
    return {
      ...step,
      guide: {
        ...guide,
        sections: [
          {
            title: 'Auditoría de Normas',
            items: ['Cumplimiento de 240 horas', 'Márgenes de 3 cm', 'Arial 12 puntos'],
          },
        ],
      },
    };
  }
  if (type === 'infoPanel') {
    const guide = step.guide || { heading: 'En este orden', keys: [{ code: '1', text: 'Revisar plazos' }] };
    return {
      ...step,
      guide: {
        ...guide,
        infoPanels: [
          {
            id: 'plazos-escuela',
            title: 'Plazos por Escuela Profesional',
            rows: [{ career: 'Sistemas', shortLabel: 'Sistemas', value: '30 días hábiles' }],
          },
        ],
      },
    };
  }
  if (type === 'attachment') {
    const guide = step.guide || { heading: 'En este orden', keys: [{ code: '1', text: 'Descargar norma' }] };
    return {
      ...step,
      guide: {
        ...guide,
        files: [{ label: 'Reglamento Oficial de Prácticas (PDF)' }],
      },
    };
  }
  return step;
}

export function removePieceFromStep(step: StepItem, piece: PalettePieceType): StepItem {
  if (piece === 'cost') {
    const { cost, ...rest } = step;
    return rest;
  }
  if (piece === 'drive') {
    const { drive, ...rest } = step;
    return rest;
  }
  if (piece === 'validity') {
    const { validity, ...rest } = step;
    return rest;
  }
  if (piece === 'alert' && step.guide) {
    return { ...step, guide: { ...step.guide, introAlert: undefined } };
  }
  if (piece === 'copyBox' && step.guide) {
    const keys = step.guide.keys.map((k) => ({ ...k, copyBox: undefined }));
    return { ...step, guide: { ...step.guide, keys } };
  }
  if (piece === 'checklist' && step.guide) {
    return { ...step, guide: { ...step.guide, sections: undefined } };
  }
  if (piece === 'infoPanel' && step.guide) {
    return { ...step, guide: { ...step.guide, infoPanels: undefined } };
  }
  if (piece === 'attachment' && step.guide) {
    return { ...step, guide: { ...step.guide, files: undefined } };
  }
  return step;
}
