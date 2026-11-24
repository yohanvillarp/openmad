import type { ModuleDefinition } from './types';

export const PRACTICAS_MODULE_GESTION: ModuleDefinition = {
  id: 'pasos-iniciales',
  label: 'Módulo 1: Gestión y Cartas',
  summary: 'Cartas requeridas, evaluación del asesor, evidencias y certificado oficial.',
  steps: [
    {
      id: 'carta-solicitud',
      label: 'Solicitar carta de presentación',
      summary: 'Obtén la Ficha de Autorización, abona aranceles en caja y presenta el expediente.',
      location: 'Secretaría de Facultad de Ingeniería',
      xpReward: 10,
      cost: {
        amount: 'S/. 16.00',
        concept: 'Cód. 464 (Carta S/. 10) + Cód. 053 (Récord S/. 6)',
        place: 'Caja UNAMAD',
      },
      drive: {
        title: 'Ficha de Autorización de Prácticas',
        driveUrl: 'https://docs.google.com/document/d/1IXkJkT6HeTQtV7uQXfmR3J7UpD_jNBEZ/edit',
        downloadUrl: 'https://docs.google.com/document/d/1IXkJkT6HeTQtV7uQXfmR3J7UpD_jNBEZ/export?format=docx',
        isOfficial: true,
      },
      guide: {
        heading: 'En este orden',
        hint: 'Puedes abrir la Ficha de Autorización en Drive o descargar la copia editable en Word.',
        keys: [
          { code: '1', text: 'Verifica haber aprobado los créditos requeridos (160 para Sistemas).' },
          { code: '2', text: 'Descarga e imprime la Ficha de Autorización.' },
          { code: '3', text: 'Paga S/. 10.00 en caja con código 464 y S/. 6.00 con código 053.' },
          {
            code: '4',
            text: 'Lleva a la Facultad de Ingeniería:',
            items: ['Voucher S/. 10.00', 'Récord académico', 'Ficha impresa y firmada'],
          },
          { code: '5', text: 'Recoge la carta de presentación: consérvala como Anexo 01.' },
        ],
      },
    },
    {
      id: 'carta-aceptacion',
      label: 'Solicitar carta de aceptación',
      summary: 'Completa el Anexo 03 y preséntalo junto con la carta ante la entidad receptora.',
      location: 'Empresa / Institución Receptora',
      xpReward: 10,
      template: true,
      drive: {
        title: 'Anexo 03: Carta de Compromiso Ético',
        driveUrl: 'https://drive.google.com/file/d/1wqWnJEmqdSepC4u50-_RkES4GkDAodpu/view',
        downloadUrl: 'https://drive.google.com/uc?export=download&id=1wqWnJEmqdSepC4u50-_RkES4GkDAodpu',
        isOfficial: true,
      },
      guide: {
        heading: 'En este orden',
        hint: 'Descarga el Anexo 03 y complétalo en Word antes de imprimirlo.',
        keys: [
          { code: '1', text: 'Descarga y completa el Anexo 03 con los datos de la entidad.' },
          { code: '2', text: 'Imprime dos copias: una para la empresa y otra para el informe.' },
          { code: '3', text: 'Recoge la carta de aceptación: consérvala como Anexo 02.' },
        ],
      },
    },
    {
      id: 'coordinar-asesor',
      label: 'Coordinar con el docente asesor',
      summary: 'Contacta al asesor, programa la visita laboral in situ y prepara la ficha de evaluación.',
      location: 'Centro de Labores / Coordinación',
      xpReward: 10,
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
        keys: [
          { code: '1', text: 'Contacta al asesor asignado por la Facultad de Ingeniería.' },
          { code: '2', text: 'Acuerda la fecha de supervisión in situ en el centro de labores.' },
          { code: '3', text: 'El asesor te evaluará con el Anexo 04. Guárdalo para el informe.' },
        ],
      },
    },
    {
      id: 'documentar-practicas',
      label: 'Documentar actividades y evidencias',
      summary: 'Registra fotografías con autorización, bitácora de tareas y estructura institucional.',
      location: 'Entidad Receptora',
      xpReward: 10,
      guide: {
        heading: 'En este orden',
        keys: [
          { code: '1', text: 'Toma fotografías autorizadas de las actividades y fachada.' },
          { code: '2', text: 'Registra bitácora diaria: fechas, horas, tecnologías y resultados.' },
        ],
      },
    },
    {
      id: 'certificado-practicas',
      label: 'Solicitar certificado o constancia',
      summary: 'Al cumplir 240h y 3 meses, solicita el documento oficial firmado y sellado (Anexo 05).',
      location: 'Recursos Humanos de la Entidad',
      xpReward: 10,
      validity: { required: true, authority: 'Titular / RRHH de la Empresa' },
      guide: {
        heading: 'En este orden',
        keys: [
          { code: '1', text: 'Comprueba que consigne: área, fechas exactas y mínimo 240 horas.' },
          { code: '2', text: 'Recoge el documento oficial firmado y sellado: será tu Anexo 05.' },
        ],
      },
    },
  ],
};
