import { steps_pasos_iniciales } from './steps-gestion.js';
import { steps_informe_practicas } from './steps-informe.js';
import { steps_sustentacion_practicas } from './steps-sustentacion.js';

export const stepIntro = 'Consulta las instrucciones de cada paso y marca tu avance conforme completes las acciones.';

export const stepsByModule = {
    'pasos-iniciales': steps_pasos_iniciales,
    'informe-practicas': steps_informe_practicas,
    'sustentacion-practicas': steps_sustentacion_practicas
};
