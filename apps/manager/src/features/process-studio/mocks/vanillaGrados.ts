import type { RouteDefinition } from '../types';

export const VANILLA_BACHILLER_ROUTE: RouteDefinition = {
  id: 'grado-bachiller',
  label: 'Grado de Bachiller',
  summary: 'El cierre de la carrera: requisitos de egreso, constancias de no adeudo, pagos y diploma.',
  color: '#22c55e',
  facultyId: 'rectorado',
  facultyLabel: 'Vicerrectorado Académico',
  schoolId: 'grados-titulos',
  schoolLabel: 'Oficina General de Grados y Títulos',
  minCredits: [{ career: 'Todas las carreras', credits: 210 }],
  modules: [
    {
      id: 'egreso-constancias',
      label: 'Módulo 1: Requisitos de Egreso',
      summary: 'Certificación de créditos, idioma extranjero y constancias de no adeudo.',
      steps: [
        {
          id: 'constancia-egresado',
          label: 'Tramitar constancia de egresado',
          summary: 'Acredita la culminación del 100% del plan de estudios y prácticas aprobadas.',
          location: 'Dirección de Asuntos Académicos',
          xpReward: 15,
          cost: { amount: 'S/. 30.00', concept: 'Constancia oficial de egreso', place: 'Caja UNAMAD' },
          guide: {
            heading: 'Solicitud de egreso',
            keys: [
              { code: '1', text: 'Presenta el récord académico con los 210 créditos aprobados.' },
              { code: '2', text: 'Adjunta el certificado de nivel intermedio de idioma extranjero.' },
            ],
          },
        },
        {
          id: 'constancias-no-adeudo',
          label: 'Constancias de no adeudo múltiple',
          summary: 'Visto bueno de Biblioteca Central, laboratorios, bienestar y tesorería.',
          location: 'Mesa de Partes General',
          xpReward: 10,
          cost: { amount: 'S/. 25.00', concept: 'Arancel de no adeudo general', place: 'Caja UNAMAD' },
          validity: { required: true, authority: 'Biblioteca Central & Bienestar Universitario' },
          guide: {
            heading: 'Sello en las 4 dependencias',
            keys: [
              { code: '1', text: 'Verifica no tener libros pendientes en Biblioteca Central.' },
              { code: '2', text: 'Verifica la devolución de equipos en laboratorios de facultad.' },
            ],
          },
        },
      ],
    },
    {
      id: 'aprobacion-bachiller',
      label: 'Módulo 2: Emisión del Diploma',
      summary: 'Aprobación en Consejo Universitario y registro nacional ante SUNEDU.',
      steps: [
        {
          id: 'resolucion-bachiller',
          label: 'Resolución y Diploma de Bachiller',
          summary: 'Publicación de resolución rectoral y registro en la base nacional de SUNEDU.',
          location: 'Secretaría General / SUNEDU',
          xpReward: 30,
          cost: { amount: 'S/. 450.00', concept: 'Derecho de diploma de Bachiller', place: 'Banco de la Nación' },
          validity: { required: true, authority: 'Consejo Universitario y SUNEDU' },
          guide: {
            heading: 'Registro oficial',
            keys: [
              { code: '1', text: 'Entrega 2 fotografías tamaño pasaporte en traje formal.' },
              { code: '2', text: 'Verifica la emisión de la Resolución de Consejo Universitario.' },
              { code: '3', text: 'Comprueba el registro de tu diploma en la web de SUNEDU.' },
            ],
            close: '¡Felicidades, Bachiller! Tu grado académico ya está registrado en SUNEDU.',
          },
        },
      ],
    },
  ],
};

export const VANILLA_TITULO_ROUTE: RouteDefinition = {
  id: 'titulo-profesional',
  label: 'Título Profesional',
  summary: 'Después del bachiller: modalidades de titulación, costos referenciales y colegiatura.',
  color: '#f54477',
  facultyId: 'decanatos',
  facultyLabel: 'Decanatos de Facultad',
  schoolId: 'titulacion',
  schoolLabel: 'Comisión de Grados y Títulos',
  minCredits: [{ career: 'Todas las carreras', credits: 210 }],
  modules: [
    {
      id: 'modalidad-titulo',
      label: 'Módulo 1: Elección de Modalidad',
      summary: 'Selecciona entre Sustentación de Tesis o Trabajo de Suficiencia Profesional.',
      steps: [
        {
          id: 'apertura-expediente-titulo',
          label: 'Apertura de expediente de titulación',
          summary: 'Presenta copia de diploma de bachiller autenticada y solicita designación de jurado.',
          location: 'Mesa de Partes de Facultad',
          xpReward: 15,
          cost: { amount: 'S/. 120.00', concept: 'Apertura de expediente de título', place: 'Caja UNAMAD' },
          guide: {
            heading: 'Inicio de trámite',
            keys: [
              { code: '1', text: 'Presenta copia autenticada del diploma de Bachiller.' },
              { code: '2', text: 'Elige la modalidad: Tesis o Suficiencia Profesional (mínimo 1 año de experiencia).' },
            ],
          },
        },
      ],
    },
    {
      id: 'colacion-titulo',
      label: 'Módulo 2: Juramentación y Colegiatura',
      summary: 'Ceremonia de colación, imposición de medalla y colegiatura profesional.',
      steps: [
        {
          id: 'ceremonia-colacion',
          label: 'Ceremonia oficial de graduación',
          summary: 'Juramentación solemne y entrega de título profesional firmado por el Rector.',
          location: 'Aula Magna UNAMAD',
          xpReward: 50,
          cost: { amount: 'S/. 650.00', concept: 'Diploma y medalla oficial de título', place: 'Banco de la Nación' },
          validity: { required: true, authority: 'Rectorado y Colegio Profesional' },
          guide: {
            heading: 'Culminación profesional',
            keys: [
              { code: '1', text: 'Asiste al ensayo general de colación en el Aula Magna.' },
              { code: '2', text: 'Juramenta ante el Rector y decano de facultad.' },
              { code: '3', text: 'Tramita la colegiatura ante tu respectivo Colegio Profesional.' },
            ],
            close: '¡Felicidades, Colega! Has alcanzado el Título Profesional.',
          },
        },
      ],
    },
  ],
};
