import type { Node, Edge } from '@xyflow/react';
import type { Tramite } from '@entities/tramite';

export const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'inicio',
    position: { x: 50, y: 15 },
    data: {},
  },
  {
    id: 'r1',
    type: 'ruta',
    position: { x: 250, y: 0 },
    data: {
      id: 'r1',
      titulo: 'Egresado',
      estado: 'COMPLETED',
    } as Tramite,
  },
  {
    id: 'r2',
    type: 'ruta',
    position: { x: 550, y: 0 },
    data: {
      id: 'r2',
      titulo: 'Bachillerato',
      estado: 'IN_PROGRESS',
    } as Tramite,
  },
  {
    id: 'r3',
    type: 'ruta',
    position: { x: 850, y: 0 },
    data: {
      id: 'r3',
      titulo: 'Título Profesional',
      estado: 'LOCKED',
    } as Tramite,
  },
  {
    id: 'end',
    type: 'fin',
    position: { x: 1100, y: 15 },
    data: {},
  }
];

export const initialEdges: Edge[] = [
  { id: 'e-s-r1', source: 'start', target: 'r1', animated: true, style: { stroke: '#10B981', strokeWidth: 2 } },
  { id: 'e-r1-r2', source: 'r1', target: 'r2', animated: true, style: { stroke: '#f59e0b', strokeWidth: 2 } },
  { id: 'e-r2-r3', source: 'r2', target: 'r3', animated: false, style: { stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '5 5' } },
  { id: 'e-r3-end', source: 'r3', target: 'end', animated: false, style: { stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '5 5' } },
];

export const bachilleratoNodes: Node[] = [
  { id: 'b-start', type: 'inicio', position: { x: 0, y: 65 }, data: {} },
  
  // ================= CHAIN 1: Documentos (y: -150) =================
  {
    id: 'b-solicitud', type: 'paso', position: { x: 300, y: -150 },
    data: { id: 'b-solicitud', titulo: 'Formato Solicitud', estado: 'COMPLETED' } as Tramite
  },
  {
    id: 'b-fotos', type: 'paso', position: { x: 550, y: -150 },
    data: { id: 'b-fotos', titulo: '05 Fotos Carnet / 03 Pasaporte', estado: 'COMPLETED' } as Tramite
  },
  {
    id: 'b-dni', type: 'paso', position: { x: 800, y: -150 },
    data: { id: 'b-dni', titulo: 'Copias DNI (Simple/Ampliada)', estado: 'IN_PROGRESS' } as Tramite
  },

  // ================= CHAIN 2: Pagos Académicos (y: 50) =================
  {
    id: 'b-derecho', type: 'paso', position: { x: 200, y: 50 },
    data: { id: 'b-derecho', titulo: 'Derecho a Grado Bachiller', estado: 'AVAILABLE', costo: 308.50 } as Tramite
  },
  {
    id: 'b-estudios', type: 'paso', position: { x: 400, y: 50 },
    data: { id: 'b-estudios', titulo: 'Certificado de Estudios', estado: 'LOCKED', costo: 120.00 } as Tramite
  },
  {
    id: 'b-resolucion', type: 'paso', position: { x: 600, y: 50 },
    data: { id: 'b-resolucion', titulo: 'Resolución Conclusión Estudios', estado: 'LOCKED', costo: 10.00 } as Tramite
  },
  {
    id: 'b-bolsa', type: 'paso', position: { x: 800, y: 50 },
    data: { id: 'b-bolsa', titulo: 'Constancia Bolsa Laboral', estado: 'LOCKED', costo: 15.00 } as Tramite
  },

  // ================= CHAIN 3: Módulos Especiales (y: 250) =================
  {
    id: 'b-idioma', type: 'modulo', position: { x: 300, y: 250 },
    data: { id: 'b-idioma', titulo: 'Certificado de Idioma Extranjero/Nativo', estado: 'COMPLETED', costo: 28.00 } as Tramite
  },
  {
    id: 'b-ofimatica', type: 'modulo', position: { x: 550, y: 250 },
    data: { id: 'b-ofimatica', titulo: 'Certificado de Ofimática', estado: 'IN_PROGRESS', costo: 56.00 } as Tramite
  },
  {
    id: 'b-rs', type: 'modulo', position: { x: 800, y: 250 },
    data: { id: 'b-rs', titulo: 'Responsabilidad Social', estado: 'LOCKED' } as Tramite
  },

  // ================= CUELLO DE BOTELLA =================
  {
    id: 'b-no-adeudo', type: 'paso', position: { x: 1050, y: 50 },
    data: { id: 'b-no-adeudo', titulo: 'Constancia de No Deudor', estado: 'LOCKED', costo: 15.00 } as Tramite
  },
  
  // ================= PASO FINAL & HITO =================
  {
    id: 'b-folder', type: 'paso', position: { x: 1300, y: 50 },
    data: { id: 'b-folder', titulo: 'Presentar Folder Negro', estado: 'LOCKED' } as Tramite
  },
  {
    id: 'b-hito-final', type: 'hito', position: { x: 1550, y: 50 },
    data: { id: 'b-hito-final', titulo: 'Resolución Decanal de Bachiller', estado: 'LOCKED' } as Tramite
  },
  {
    id: 'b-end', type: 'fin', position: { x: 1800, y: 65 },
    data: { titulo: 'Volver a Rutas' }
  }
];

export const bachilleratoEdges: Edge[] = [
  // Del inicio nacen las 3 ramas
  { id: 'e-start-sol', source: 'b-start', target: 'b-solicitud', sourceHandle: 'right-source', targetHandle: 'left-target', animated: true, style: { stroke: '#10B981', strokeWidth: 2 } },
  { id: 'e-start-der', source: 'b-start', target: 'b-derecho', sourceHandle: 'right-source', targetHandle: 'left-target', animated: true, style: { stroke: '#10B981', strokeWidth: 2 } },
  { id: 'e-start-idi', source: 'b-start', target: 'b-idioma', sourceHandle: 'right-source', targetHandle: 'left-target', animated: true, style: { stroke: '#10B981', strokeWidth: 2 } },

  // Rama 1 (Documentos)
  { id: 'e-sol-fot', source: 'b-solicitud', target: 'b-fotos', sourceHandle: 'right-source', targetHandle: 'left-target', animated: true, style: { stroke: '#10B981', strokeWidth: 2 } },
  { id: 'e-fot-dni', source: 'b-fotos', target: 'b-dni', sourceHandle: 'right-source', targetHandle: 'left-target', animated: true, style: { stroke: '#f59e0b', strokeWidth: 2 } },
  { id: 'e-dni-noade', source: 'b-dni', target: 'b-no-adeudo', sourceHandle: 'right-source', targetHandle: 'top', animated: false, style: { stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '5 5' } },

  // Rama 2 (Pagos)
  { id: 'e-der-est', source: 'b-derecho', target: 'b-estudios', sourceHandle: 'right-source', targetHandle: 'left-target', animated: false, style: { stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '5 5' } },
  { id: 'e-est-res', source: 'b-estudios', target: 'b-resolucion', sourceHandle: 'right-source', targetHandle: 'left-target', animated: false, style: { stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '5 5' } },
  { id: 'e-res-bol', source: 'b-resolucion', target: 'b-bolsa', sourceHandle: 'right-source', targetHandle: 'left-target', animated: false, style: { stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '5 5' } },
  { id: 'e-bol-noade', source: 'b-bolsa', target: 'b-no-adeudo', sourceHandle: 'right-source', targetHandle: 'left-target', animated: false, style: { stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '5 5' } },

  // Rama 3 (Módulos)
  { id: 'e-idi-ofi', source: 'b-idioma', target: 'b-ofimatica', sourceHandle: 'right-source', targetHandle: 'left-target', animated: true, style: { stroke: '#f59e0b', strokeWidth: 2 } },
  { id: 'e-ofi-rs', source: 'b-ofimatica', target: 'b-rs', sourceHandle: 'right-source', targetHandle: 'left-target', animated: false, style: { stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '5 5' } },
  { id: 'e-rs-noade', source: 'b-rs', target: 'b-no-adeudo', sourceHandle: 'right-source', targetHandle: 'bottom', animated: false, style: { stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '5 5' } },

  // Cuello de botella y final
  { id: 'e-noade-fol', source: 'b-no-adeudo', target: 'b-folder', sourceHandle: 'right-source', targetHandle: 'left-target', animated: false, style: { stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '5 5' } },
  { id: 'e-fol-hito', source: 'b-folder', target: 'b-hito-final', sourceHandle: 'right-source', targetHandle: 'left-target', animated: false, style: { stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '5 5' } },
  { id: 'e-hito-end', source: 'b-hito-final', target: 'b-end', sourceHandle: 'right-source', targetHandle: 'left-target', animated: false, style: { stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '5 5' } },
];
