import type { RouteDefinition } from '../types';

export const VANILLA_TESIS_ROUTE: RouteDefinition = {
  id: 'tesis',
  label: 'Tesis Universitaria',
  summary: 'Del plan a la sustentación: asesoría, Turnitin, dictamen de jurados y defensa pública.',
  color: '#1e3a8a',
  facultyId: 'investigacion',
  facultyLabel: 'Vicerrectorado de Investigación',
  schoolId: 'todas',
  schoolLabel: 'Todas las Escuelas Profesionales',
  minCredits: [{ career: 'Todas las carreras', credits: 200 }],
  modules: [
    {
      id: 'plan-tesis',
      label: 'Módulo 1: Plan de Tesis',
      summary: 'Formulación del proyecto de investigación, designación de asesor y dictamen favorable.',
      steps: [
        {
          id: 'registro-tema',
          label: 'Registrar línea y tema de investigación',
          summary: 'Inscribe el tema alineado a las líneas de investigación prioritarias de la UNAMAD.',
          location: 'Dirección de Investigación / Coordinación de Escuela',
          xpReward: 15,
          guide: {
            heading: 'Inscripción del tema',
            keys: [
              { code: '1', text: 'Revisa las líneas de investigación vigentes de tu facultad.' },
              { code: '2', text: 'Presenta la ficha de inscripción con visto bueno del docente asesor.' },
            ],
          },
        },
        {
          id: 'dictamen-plan',
          label: 'Aprobación del Plan de Tesis',
          summary: 'Evaluación por los 3 jurados dictaminantes designados mediante resolución decanal.',
          location: 'Consejo de Facultad / Comisión de Investigación',
          xpReward: 20,
          validity: { required: true, authority: 'Comisión de Investigación y Decanato' },
          guide: {
            heading: 'Revisión y levantamiento de observaciones',
            keys: [
              { code: '1', text: 'Entrega 3 ejemplares del plan a los jurados revisores.' },
              { code: '2', text: 'Levanta las observaciones dentro del plazo máximo de 15 días.' },
              { code: '3', text: 'Obtén la Resolución Decanal de aprobación del proyecto.' },
            ],
          },
        },
      ],
    },
    {
      id: 'ejecucion-tesis',
      label: 'Módulo 2: Ejecución y Reporte Turnitin',
      summary: 'Trabajo de campo, análisis estadístico y control de similitud de texto.',
      steps: [
        {
          id: 'turnitin-eval',
          label: 'Revisión de Similitud Turnitin',
          summary: 'Certificación antiplagio con índice de similitud menor al 25% reglamentario.',
          location: 'Unidad de Investigación / Repositorio',
          xpReward: 20,
          validity: { required: true, authority: 'Operador Certificado Turnitin UNAMAD', deadline: '< 25% similitud' },
          guide: {
            heading: 'Control de originalidad',
            introAlert: 'OBLIGATORIO: El porcentaje de similitud debe ser estrictamente menor al 25% para ser admitido.',
            keys: [
              { code: '1', text: 'Envía el borrador de tesis en formato DOCX sin carátula ni anexos.' },
              { code: '2', text: 'Recibe el informe de similitud generado por la plataforma Turnitin.' },
              { code: '3', text: 'Si supera el 25%, parafrasea y cita adecuadamente antes de reingresar.' },
            ],
          },
        },
      ],
    },
    {
      id: 'sustentacion-tesis',
      label: 'Módulo 3: Sustentación y Repositorio',
      summary: 'Defensa pública ante jurado calificador y depósito en el repositorio institucional ALICIA.',
      steps: [
        {
          id: 'defensa-publica',
          label: 'Sustentación pública de tesis',
          summary: 'Defensa oral de la tesis y obtención de la calificación (Aprobado por Unanimidad / Mayoría).',
          location: 'Paraninfo Universitario UNAMAD',
          xpReward: 50,
          cost: {
            amount: 'S/. 350.00',
            concept: 'Derecho de sustentación y jurado examinador',
            place: 'Caja Central UNAMAD',
          },
          validity: { required: true, authority: 'Jurado Examinador y Decano' },
          guide: {
            heading: 'Acto de sustentación',
            keys: [
              { code: '1', text: 'Paga la tasa por derecho de sustentación de tesis.' },
              { code: '2', text: 'Defiende la investigación durante 45 minutos ante el tribunal.' },
              { code: '3', text: 'Firma el acta de sustentación y deposita el PDF final en ALICIA-CONCYTEC.' },
            ],
          },
        },
      ],
    },
  ],
};
