import type { ModuleDefinition } from '../types';

export const PRACTICAS_MODULE_INFORME: ModuleDefinition = {
  id: 'informe-practicas',
  label: 'Módulo 2: Informe de prácticas',
  summary: 'Descarga de plantilla, redacción conforme a reglamento, orden de anexos y presentación por correo.',
  steps: [
    {
      id: 'plantilla-informe',
      label: 'Descargar la plantilla del informe',
      summary: 'Descarga la plantilla oficial en formato DOCX y consérvala para la redacción.',
      location: 'Google Drive Oficial UNAMAD',
      xpReward: 10,
      template: true,
      drive: {
        title: 'Plantilla Oficial Informe de Prácticas Pre-Profesionales',
        driveUrl: 'https://drive.google.com/file/d/1lizE80ocKIdeUykx6mMhGV9ni82XJNLT/view',
        downloadUrl: 'https://docs.google.com/document/d/1lizE80ocKIdeUykx6mMhGV9ni82XJNLT/export?format=docx',
        isOfficial: true,
      },
      guide: {
        heading: 'Descarga y verifica el archivo',
        hint: 'Descarga el archivo y ábrelo en Microsoft Word para conservar su formato institucional.',
        keys: [
          { code: '1', text: 'Descarga la plantilla en formato DOCX editable.' },
          { code: '2', text: 'Guarda una copia nombrada: Informe Final - Apellidos y Nombres.' },
          { code: '3', text: 'Abre en MS Word y comprueba que se respeten márgenes y estilos.' },
        ],
      },
    },
    {
      id: 'redactar-informe',
      label: 'Redactar el informe',
      summary: 'Estructura el informe, verifica horas efectivas (240h), normas APA/IEEE y evidencias.',
      location: 'Asesoría Académica / Comisión de Prácticas',
      xpReward: 10,
      validity: { required: true, authority: 'Comisión Revisora de Prácticas' },
      drive: {
        title: 'Reglamento de Prácticas Preprofesionales EPISI',
        driveUrl: 'https://drive.google.com/file/d/1l5ZhUNbjhYkr1kTga0aGOKcgmU8hS4Df/view',
        isOfficial: true,
      },
      guide: {
        heading: 'Redacción y control final del informe',
        hint: 'Consulta el reglamento completo de la escuela profesional.',
        keys: [
          { code: '1', text: 'Reemplaza el contenido entre llaves {} con tus datos reales.' },
          { code: '2', text: 'Verifica al menos 240 horas efectivas en un lapso no menor a 3 meses.' },
          { code: '3', text: 'Comprueba que las horas respeten la jornada de 4 horas diarias.' },
          { code: '4', text: 'Aplica formato Arial 12, interlineado 1.5 y márgenes de 3 cm.' },
          { code: '5', text: 'Por cada objetivo específico, redacta una conclusión y recomendación.' },
        ],
        sections: [
          {
            title: 'Control de Horas y Coherencia Temporal',
            items: [
              'Al menos 240 horas efectivas registradas.',
              'Periodo mínimo de desarrollo de 3 meses.',
              'Jornada no mayor a 4 horas diarias.',
              'Fechas idénticas en carta de presentación, evaluación y constancia.',
            ],
          },
          {
            title: 'Normas de Formato y Estilo',
            items: [
              'Márgenes: 3 cm en los 4 costados.',
              'Fuente Arial 12 puntos, interlineado 1.5.',
              'Títulos en Arial 14 negrita y subtítulos en Arial 12 negrita.',
              'Numeración en esquina superior derecha (sin adornos).',
            ],
          },
        ],
      },
    },
    {
      id: 'anexos',
      label: 'Armar los anexos',
      summary: 'Reúne y ordena cronológicamente los documentos del Anexo 01 al Anexo 05.',
      location: 'Gabinete Personal / Expediente Digital',
      xpReward: 10,
      guide: {
        heading: 'Reúne y ordena cada anexo',
        intro: 'Incorpora al final del informe los documentos obtenidos durante tus prácticas en este estricto orden:',
        keys: [
          { code: 'Anexo 01', text: 'Carta de presentación otorgada por la Facultad de Ingeniería.' },
          { code: 'Anexo 02', text: 'Carta de aceptación emitida y sellada por la empresa receptora.' },
          { code: 'Anexo 03', text: 'Carta de compromiso ético y profesional firmada por el practicante.' },
          { code: 'Anexo 04', text: 'Ficha de evaluación in situ con firma y sello del docente asesor.' },
          { code: 'Anexo 05', text: 'Certificado o constancia de prácticas con horas y fechas certificadas.' },
        ],
        close: 'Comprueba que cada anexo sea legible y cuente con los sellos y firmas requeridas.',
      },
    },
    {
      id: 'presentar-informe',
      label: 'Presentar el informe',
      summary: 'Envía las versiones PDF y DOCX al correo de la Facultad dentro del plazo reglamentario.',
      location: 'Mesa de Partes Virtual / Correo Institucional',
      xpReward: 10,
      validity: { required: true, authority: 'Decanato / Mesa de Partes', deadline: '30 días hábiles (Sistemas)' },
      guide: {
        heading: 'Cómo presentar el informe por correo',
        keys: [
          { code: '1', text: 'Prepara dos archivos con idéntico contenido: DOCX editable y PDF firmado.' },
          { code: '2', text: 'Abre un correo nuevo dirigido al correo institucional de la Facultad.' },
          { code: '3', text: 'Asunto: PRESENTACIÓN DE INFORME FINAL DE PRÁCTICAS - {CÓDIGO} - {APELLIDOS}' },
          {
            code: '4',
            text: 'Copia el texto modelo en el cuerpo del correo completando tus datos personales:',
            copyBox: {
              id: 'copy-informe-mensaje',
              content:
                'Mediante el presente correo solicito el trámite de revisión de mi Informe Final de Prácticas Pre-Profesionales.\n\nEstudiante: {APELLIDOS Y NOMBRES}\nCódigo: {CÓDIGO}\nEscuela: Ingeniería de Sistemas e Informática\nCelular: {CELULAR}\nEntidad: {EMPRESA}',
            },
          },
          { code: '5', text: 'Adjunta los archivos DOCX y PDF y envía el correo respetando el plazo de tu carrera.' },
        ],
        infoPanels: [
          {
            id: 'plazos-carrera',
            eyebrow: 'Normativa Reglamentaria',
            title: 'Plazos de Presentación según Carrera',
            rows: [
              { career: 'Ingeniería de Sistemas e Informática', shortLabel: 'Sistemas', value: '30 días hábiles posteriores al término' },
              { career: 'Ingeniería Agroindustrial', shortLabel: 'Agroindustrial', value: '60 días calendario posteriores al término' },
              { career: 'Ingeniería Forestal y Medio Ambiente', shortLabel: 'Forestal', value: '10 días calendario posteriores al término' },
            ],
          },
        ],
      },
    },
  ],
};

export const PRACTICAS_MODULE_SUSTENTACION: ModuleDefinition = {
  id: 'sustentacion-practicas',
  label: 'Módulo 3: Sustentación de prácticas',
  summary: 'Programación de jurado, exposición oral y registro del acta de 0 créditos.',
  steps: [
    {
      id: 'confirmar-sustentacion',
      label: 'Confirmar la fecha de sustentación',
      summary: 'Verifica el correo oficial que aprueba el informe y programa la sustentación.',
      location: 'Secretaría de Facultad / Correo Institucional',
      xpReward: 10,
      validity: { required: true, authority: 'Decanato / Jurado Calificador' },
      guide: {
        heading: 'Antes de continuar',
        keys: [
          { code: '1', text: 'Espera el correo con el dictamen favorable y la fecha y hora asignadas.' },
          { code: '2', text: 'Verifica si la modalidad asignada es presencial o virtual.' },
        ],
      },
    },
    {
      id: 'preparar-copias',
      label: 'Preparar las copias del informe',
      summary: 'Imprime los 3 ejemplares solicitados y colócalos en fólder manila.',
      location: 'Centro de Impresiones',
      xpReward: 10,
      guide: {
        heading: 'Material físico',
        keys: [
          { code: '1', text: 'Imprime 3 ejemplares físicos del informe aprobado.' },
          { code: '2', text: 'Coloca cada ejemplar debidamente anillado o en fólder manila.' },
        ],
      },
    },
    {
      id: 'preparar-expo',
      label: 'Preparar la exposición',
      summary: 'Prepara diapositivas con resultados, evidencias y aportes para defender ante jurado.',
      location: 'Preparación Personal',
      xpReward: 10,
      guide: {
        heading: 'Dominio de la sustentación',
        keys: [
          { code: '1', text: 'Estructura una presentación clara (máximo 15 a 20 minutos).' },
          { code: '2', text: 'Enfócate en objetivos, problemas resueltos y evidencias fotográficas.' },
          { code: '3', text: 'Lleva laptop, cargador y copia de respaldo en USB.' },
        ],
      },
    },
    {
      id: 'sustentar',
      label: 'Realizar la sustentación',
      summary: 'Expón tu trabajo, absuelve interrogantes del jurado y recoge el acta oficial.',
      location: 'Sala de Grados y Títulos UNAMAD',
      xpReward: 10,
      validity: { required: true, authority: 'Presidente y Miembros del Jurado' },
      guide: {
        heading: 'El día de la sustentación',
        keys: [
          { code: '1', text: 'Llega con 20 minutos de anticipación al aula asignada.' },
          { code: '2', text: 'Realiza la exposición y responde con solvencia las preguntas formuladas.' },
          { code: '3', text: 'Recoge el acta firmada con el dictamen de APROBADO.' },
        ],
        close: '¡Felicidades! Al registrarse el acta en el intranet como 0 créditos, habrás culminado la ruta.',
      },
    },
  ],
};
