import type { RouteDefinition } from '../types';
import { PRACTICAS_MODULE_GESTION } from './vanillaPracticas';
import {
  PRACTICAS_MODULE_INFORME,
  PRACTICAS_MODULE_SUSTENTACION,
} from './vanillaPracticasInforme';
import { VANILLA_TESIS_ROUTE } from './vanillaTesis';
import {
  VANILLA_BACHILLER_ROUTE,
  VANILLA_TITULO_ROUTE,
} from './vanillaGrados';

export const VANILLA_PRACTICAS_ROUTE: RouteDefinition = {
  id: 'practicas-preprofesionales',
  label: 'Prácticas Pre-Profesionales',
  summary: 'Gestiona los documentos, el desarrollo, el informe y la sustentación de tus prácticas preprofesionales.',
  color: '#0d9488',
  facultyId: 'ingenieria',
  facultyLabel: 'Facultad de Ingeniería',
  schoolId: 'sistemas-informatica',
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

export const VANILLA_ROUTES: RouteDefinition[] = [
  VANILLA_PRACTICAS_ROUTE,
  VANILLA_TESIS_ROUTE,
  VANILLA_BACHILLER_ROUTE,
  VANILLA_TITULO_ROUTE,
];

export function getRouteById(id: string): RouteDefinition | undefined {
  return VANILLA_ROUTES.find((r) => r.id === id);
}

export function getTotalRouteSteps(route: RouteDefinition): number {
  return route.modules.reduce((acc, m) => acc + m.steps.length, 0);
}

export function getTotalRouteCost(route: RouteDefinition): number {
  let total = 0;
  for (const m of route.modules) {
    for (const s of m.steps) {
      if (s.cost?.amount) {
        const num = parseFloat(s.cost.amount.replace(/[^0-9.]/g, ''));
        if (!isNaN(num)) total += num;
      }
    }
  }
  return total;
}
