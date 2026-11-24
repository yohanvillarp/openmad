import type { ModuleDefinition } from './types';

export const PRACTICAS_MODULE_INFORME: ModuleDefinition = {
  id: 'informe-practicas',
  label: 'Módulo 2: Informe Final',
  summary: 'Descarga de plantilla oficial, redacción según normas, anexos 01 al 05 y presentación por correo.',
  steps: [
    {
      id: 'plantilla-informe',
      label: 'Descargar plantilla oficial del informe',
      summary: 'Obtén la plantilla oficial en formato DOCX y guarda una copia para la redacción.',
      location: 'Google Drive Oficial UNAMAD',
      xpReward: 10,
      template: true,
      drive: {
        title: 'Plantilla Oficial Informe de Prácticas (DOCX)',
        driveUrl: 'https://drive.google.com/file/d/1lizE80ocKIdeUykx6mMhGV9ni82XJNLT/view',
        downloadUrl: 'https://docs.google.com/document/d/1lizE80ocKIdeUykx6mMhGV9ni82XJNLT/export?format=docx',
        isOfficial: true,
      },
      guide: {
        heading: 'Descarga y verifica el archivo',
        keys: [
          { code: '1', text: 'Descarga la plantilla oficial en DOCX editable.' },
          { code: '2', text: 'Guarda con nombre: Informe Final - Apellidos y Nombres.' },
        ],
      },
    },
    {
      id: 'redactar-informe',
      label: 'Redactar el informe de prácticas',
      summary: 'Acredita 240 horas efectivas, formato Arial 12, interlineado 1.5 y márgenes de 3 cm.',
      location: 'Asesoría Académica',
      xpReward: 10,
      validity: { required: true, authority: 'Comisión Revisora de Prácticas' },
      drive: {
        title: 'Reglamento de Prácticas Preprofesionales EPISI',
        driveUrl: 'https://drive.google.com/file/d/1l5ZhUNbjhYkr1kTga0aGOKcgmU8hS4Df/view',
        isOfficial: true,
      },
      guide: {
        heading: 'Redacción y control final',
        keys: [
          { code: '1', text: 'Acredita al menos 240 horas efectivas durante mínimo 3 meses.' },
          { code: '2', text: 'Aplica formato Arial 12, interlineado 1.5 y márgenes de 3 cm.' },
          { code: '3', text: 'Por cada objetivo específico, redacta una conclusión y recomendación.' },
        ],
        sections: [
          {
            title: 'Control de Horas y Coherencia Temporal',
            items: [
              'Al menos 240 horas efectivas registradas.',
              'Periodo mínimo de desarrollo de 3 meses.',
              'Jornada no mayor a 4 horas diarias.',
            ],
          },
        ],
      },
    },
    {
      id: 'anexos',
      label: 'Armar los anexos del 01 al 05',
      summary: 'Ordena cronológicamente los documentos obtenidos durante las prácticas.',
      location: 'Expediente Personal',
      xpReward: 10,
      guide: {
        heading: 'Orden de los anexos',
        keys: [
          { code: 'Anexo 01', text: 'Carta de presentación de la Facultad de Ingeniería.' },
          { code: 'Anexo 02', text: 'Carta de aceptación de la entidad receptora.' },
          { code: 'Anexo 03', text: 'Carta de compromiso ético y profesional.' },
          { code: 'Anexo 04', text: 'Ficha de evaluación del docente asesor.' },
          { code: 'Anexo 05', text: 'Certificado de prácticas con 240 horas.' },
        ],
      },
    },
    {
      id: 'presentar-informe',
      label: 'Presentar el informe por correo',
      summary: 'Envía las versiones PDF y DOCX al correo de Facultad dentro del plazo de tu carrera.',
      location: 'Mesa de Partes Virtual / Correo Institucional',
      xpReward: 10,
      validity: { required: true, authority: 'Decanato / Mesa de Partes', deadline: '30 días hábiles (Sistemas)' },
      guide: {
        heading: 'Presentación formal',
        keys: [
          { code: '1', text: 'Prepara DOCX editable y PDF firmado idénticos.' },
          {
            code: '2',
            text: 'Copia el texto modelo en el cuerpo del correo:',
            copyBox: {
              id: 'copy-correo',
              content:
                'Mediante el presente solicito el trámite de revisión de mi Informe Final de Prácticas Pre-Profesionales.\n\nEstudiante: {APELLIDOS Y NOMBRES}\nCódigo: {CÓDIGO}\nEscuela: Ingeniería de Sistemas e Informática',
            },
          },
          { code: '3', text: 'Adjunta los archivos y envía dentro del plazo de 30 días hábiles.' },
        ],
      },
    },
  ],
};

export const PRACTICAS_MODULE_SUSTENTACION: ModuleDefinition = {
  id: 'sustentacion-practicas',
  label: 'Módulo 3: Sustentación',
  summary: 'Programación de jurado, exposición oral y registro de acta con 0 créditos.',
  steps: [
    {
      id: 'confirmar-sustentacion',
      label: 'Confirmar fecha de sustentación',
      summary: 'Verifica el correo de Facultad que aprueba el informe y programa la fecha.',
      location: 'Secretaría de Facultad / Correo Institucional',
      xpReward: 10,
      validity: { required: true, authority: 'Decanato / Jurado Calificador' },
      guide: {
        heading: 'Antes de continuar',
        keys: [{ code: '1', text: 'Espera el correo con el dictamen favorable y la fecha y hora.' }],
      },
    },
    {
      id: 'sustentar',
      label: 'Realizar la sustentación ante jurado',
      summary: 'Expón tus actividades, absuelve interrogantes y recoge el acta aprobatoria.',
      location: 'Sala de Grados y Títulos UNAMAD',
      xpReward: 20,
      validity: { required: true, authority: 'Jurado Calificador' },
      guide: {
        heading: 'El día de la sustentación',
        keys: [
          { code: '1', text: 'Realiza la exposición oral (15 a 20 minutos) con diapositivas.' },
          { code: '2', text: 'Recoge el acta firmada con el dictamen de APROBADO.' },
        ],
        close: '¡Felicidades! Al registrarse el acta en intranet con 0 créditos, habrás culminado esta ruta.',
      },
    },
  ],
};
