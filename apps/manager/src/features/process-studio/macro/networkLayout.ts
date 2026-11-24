import { MarkerType, type Edge, type Node } from '@xyflow/react';

export function getInitialMacroNodes(
  onOpenProcessBuilder: (id: string) => void
): Node[] {
  return [
    {
      id: 'proc-prereq',
      type: 'startNode',
      position: { x: 30, y: 160 },
      data: {
        title: 'Créditos Aprobados',
        minCredits: 140,
        faculty: 'Facultad de Ingeniería',
      },
    },
    {
      id: 'practicas-preprofesionales',
      type: 'processNode',
      position: { x: 330, y: 50 },
      data: {
        id: 'practicas-preprofesionales',
        title: 'Prácticas Pre-Profesionales 2026',
        category: 'Formación Práctica',
        stepsCount: 13,
        totalCost: 'S/. 16.00',
        driveDocs: 5,
        faculty: 'Ingeniería de Sistemas',
        status: 'published',
        onOpenBuilder: onOpenProcessBuilder,
      },
    },
    {
      id: 'tesis',
      type: 'processNode',
      position: { x: 330, y: 280 },
      data: {
        id: 'tesis',
        title: 'Tesis Universitaria',
        category: 'Investigación & Turnitin',
        stepsCount: 4,
        totalCost: 'S/. 350.00',
        driveDocs: 2,
        faculty: 'Vicerrectorado de Investigación',
        status: 'published',
        onOpenBuilder: onOpenProcessBuilder,
      },
    },
    {
      id: 'grado-bachiller',
      type: 'processNode',
      position: { x: 740, y: 160 },
      data: {
        id: 'grado-bachiller',
        title: 'Grado de Bachiller',
        category: 'Grados y Títulos',
        stepsCount: 3,
        totalCost: 'S/. 505.00',
        driveDocs: 3,
        faculty: 'Secretaría General / SUNEDU',
        status: 'published',
        onOpenBuilder: onOpenProcessBuilder,
      },
    },
    {
      id: 'titulo-profesional',
      type: 'goalNode',
      position: { x: 1120, y: 160 },
      data: {
        title: 'Título Profesional Emitido',
        desc: 'Diploma oficial UNAMAD y Registro Nacional en SUNEDU.',
      },
    },
  ];
}

export function getInitialMacroEdges(): Edge[] {
  return [
    {
      id: 'e-1',
      source: 'proc-prereq',
      target: 'practicas-preprofesionales',
      animated: true,
      style: { stroke: '#00e5ff', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#00e5ff' },
    },
    {
      id: 'e-2',
      source: 'proc-prereq',
      target: 'tesis',
      animated: true,
      style: { stroke: '#a855f7', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#a855f7' },
    },
    {
      id: 'e-3',
      source: 'practicas-preprofesionales',
      target: 'grado-bachiller',
      animated: true,
      style: { stroke: '#00e5ff', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#00e5ff' },
    },
    {
      id: 'e-4',
      source: 'tesis',
      target: 'grado-bachiller',
      animated: true,
      style: { stroke: '#a855f7', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#a855f7' },
    },
    {
      id: 'e-5',
      source: 'grado-bachiller',
      target: 'titulo-profesional',
      animated: true,
      style: { stroke: '#10b981', strokeWidth: 3.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
    },
  ];
}
