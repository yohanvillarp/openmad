import type { ModuleDefinition } from '../types';

export const PRACTICAS_MODULE_GESTION: ModuleDefinition = {
  id: 'pasos-iniciales',
  label: 'Módulo 1: Gestión y desarrollo',
  summary: 'Cartas requeridas, evaluación in situ del asesor, registro de evidencias y certificado oficial.',
  steps: [
    {
      id: 'carta-solicitud',
      label: 'Solicitar carta de presentación',
      summary: 'Obtén la Ficha de Autorización, realiza pagos en caja y presenta el expediente.',
      location: 'Secretaría de Facultad de Ingeniería',
      xpReward: 10,
      cost: {
        amount: 'S/. 16.00',
        concept: 'Cód. 464 (Carta S/. 10) + Cód. 053 (Récord S/. 6)',
        place: 'Caja UNAMAD',
        codes: [
          { code: '464', label: 'Carta de presentación', amount: 'S/. 10.00' },
          { code: '053', label: 'Récord académico', amount: 'S/. 6.00' },
        ],
      },
      drive: {
        title: 'Ficha de Autorización de Prácticas',
        driveUrl: 'https://docs.google.com/document/d/1IXkJkT6HeTQtV7uQXfmR3J7UpD_jNBEZ/edit',
        downloadUrl: 'https://docs.google.com/document/d/1IXkJkT6HeTQtV7uQXfmR3J7UpD_jNBEZ/export?format=docx',
        isOfficial: true,
      },
      guide: {
        heading: 'En este orden',
        hint: 'Puedes abrir la Ficha de Autorización en Drive o descargar la copia editable.',
        keys: [
          { code: '1', text: 'Verifica haber aprobado los créditos requeridos (160 para Sistemas).' },
          { code: '2', text: 'Descarga e imprime la Ficha de Autorización.' },
          { code: '3', text: 'Paga S/. 10.00 en caja con el código 464.' },
          { code: '4', text: 'Paga S/. 6.00 en caja con el código 053 para récord académico.' },
          {
            code: '5',
            text: 'Lleva a la Facultad de Ingeniería:',
            items: ['Voucher S/. 10.00', 'Récord académico', 'Ficha impresa y con datos completos'],
          },
          { code: '6', text: 'Recoge la carta de presentación en la fecha señalada.' },
          { code: '7', text: 'Conserva una copia de la carta: será tu Anexo 01.' },
        ],
      },
    },
    {
      id: 'carta-aceptacion',
      label: 'Solicitar carta de aceptación',
      summary: 'Completa el Anexo 03 y preséntalo junto con la carta de presentación.',
      location: 'Oficina de Prácticas / Empresa Receptora',
      xpReward: 10,
      template: true,
      drive: {
        title: 'Anexo 03: Carta de Compromiso Ético y Profesional',
        driveUrl: 'https://drive.google.com/file/d/1wqWnJEmqdSepC4u50-_RkES4GkDAodpu/view',
        downloadUrl: 'https://drive.google.com/uc?export=download&id=1wqWnJEmqdSepC4u50-_RkES4GkDAodpu',
        isOfficial: true,
      },
      guide: {
        heading: 'En este orden',
        hint: 'Descarga el Anexo 03, complétalo y evita editarlo directamente en Google Docs.',
        keys: [
          { code: '1', text: 'Descarga y completa los campos del Anexo 03.' },
          { code: '2', text: 'Imprime dos copias: una para entregar y otra como Anexo 03 del informe.' },
          { code: '3', text: 'Presenta la carta y el Anexo 03 en la oficina correspondiente.' },
          { code: '4', text: 'Recoge la carta de aceptación en la fecha señalada.' },
          { code: '5', text: 'Haz una copia de la aceptación: será tu Anexo 02.' },
          { code: '6', text: 'Consulta el contacto de tu asesor designado en la facultad.' },
        ],
      },
    },
    {
      id: 'coordinar-asesor',
      label: 'Coordinar con el asesor',
      summary: 'Contacta al asesor, acuerda la fecha de visita y prepara la ficha de evaluación.',
      location: 'Centro de Labores / Coordinación de Prácticas',
      xpReward: 10,
      template: true,
      validity: { required: true, authority: 'Docente Asesor Designado', deadline: 'Durante las prácticas' },
      drive: {
        title: 'Anexo 04: Ficha de Evaluación In Situ',
        driveUrl: 'https://drive.google.com/file/d/1KdQ0cny7pWvvMhaMMLfw_r5xbtA7-Ifu/view',
        downloadUrl: 'https://drive.google.com/uc?export=download&id=1KdQ0cny7pWvvMhaMMLfw_r5xbtA7-Ifu',
        isOfficial: true,
      },
      guide: {
        heading: 'En este orden',
        introAlert: 'IMPORTANTE: Todo este paso debe completarse obligatoriamente MIENTRAS realizas las prácticas.',
        hint: 'El asesor utilizará el Anexo 04 para evaluarte durante su visita.',
        keys: [
          { code: '1', text: 'Contacta al asesor asignado por la Facultad de Ingeniería.' },
          { code: '2', text: 'Descarga el Anexo 04 y acuerda la fecha de visita in situ.' },
          { code: '3', text: 'El asesor te evaluará en el centro laboral. Conserva la ficha para el informe.' },
        ],
      },
    },
    {
      id: 'documentar-practicas',
      label: 'Documentar las prácticas',
      summary: 'Registra fotografías, actividades y datos de la entidad como sustento en el informe.',
      location: 'Puesto de Trabajo / Entidad Receptora',
      xpReward: 10,
      guide: {
        heading: 'En este orden',
        hint: 'Solicita autorización antes de tomar fotografías y evita información confidencial.',
        keys: [
          { code: '1', text: 'Toma fotografías de tus actividades con autorización institucional.' },
          { code: '2', text: 'Toma al menos una fotografía de la fachada de la entidad.' },
          { code: '3', text: 'Registra bitácora diaria: fechas, recursos y resultados obtenidos.' },
          { code: '4', text: 'Recopila organigrama, misión, visión y dirección exacta de la entidad.' },
        ],
      },
    },
    {
      id: 'certificado-practicas',
      label: 'Solicitar certificado o constancia',
      summary: 'Al cumplir 240h y 3 meses, solicita a la entidad el documento oficial (Anexo 05).',
      location: 'Recursos Humanos / Dirección de la Entidad',
      xpReward: 10,
      validity: { required: true, authority: 'Titular / RRHH de la Empresa Receptora' },
      guide: {
        heading: 'En este orden',
        intro: 'Inicia este trámite cuando hayas cumplido la fecha de término y las 240 horas mínimas.',
        keys: [
          { code: '1', text: 'Verifica que la oficina correspondiente emita la constancia oficial.' },
          {
            code: '2',
            text: 'Comprueba que consigne obligatoriamente:',
            items: ['Nombre completo', 'Área exacta de trabajo', 'Fechas de inicio y fin', 'Total de horas (mínimo 240h)'],
          },
          { code: '3', text: 'Recoge el documento firmado y sellado: será tu Anexo 05.' },
        ],
        close: 'Las horas y fechas deben coincidir con la carta de presentación y la ficha de evaluación.',
      },
    },
  ],
};
