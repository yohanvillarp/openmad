import type { RouteDefinition } from './types';
import { PRACTICAS_MODULE_GESTION } from './mockPracticasModules';
import {
  PRACTICAS_MODULE_INFORME,
  PRACTICAS_MODULE_SUSTENTACION,
} from './mockPracticasInforme';

export const APPROVED_PRACTICAS_ROUTE: RouteDefinition = {
  id: 'practicas-preprofesionales',
  label: 'Prácticas Pre-Profesionales',
  summary: 'Ruta oficial aprobada: gestiona cartas, asesoría in situ, informe final y sustentación.',
  color: '#0d9488',
  facultyLabel: 'Facultad de Ingeniería',
  schoolLabel: 'Ingeniería de Sistemas e Informática',
  minCredits: [
    { career: 'Ingeniería de Sistemas e Informática', credits: 160, note: 'Para iniciar prácticas I, II y III' },
    { career: 'Ingeniería Agroindustrial', credits: 147, note: 'Práctica I (147 cr), Práctica II (202 cr)' },
    { career: 'Ingeniería Forestal y Medio Ambiente', credits: 130, note: 'Práctica I (130 cr), Práctica II (150 cr)' },
  ],
  modules: [
    PRACTICAS_MODULE_GESTION,
    PRACTICAS_MODULE_INFORME,
    PRACTICAS_MODULE_SUSTENTACION,
  ],
};

export const APPROVED_ROUTES: RouteDefinition[] = [APPROVED_PRACTICAS_ROUTE];
