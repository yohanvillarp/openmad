import type { Tramite } from '../../domain/entities/tramite.entity.js';

export interface RequisitoSalidaDto {
  id: string;
  titulo: string;
  descripcion: string | null;
  obligatorio: boolean;
  orden: number;
}

export interface TramiteSalidaDto {
  id: string;
  codigo: string;
  titulo: string;
  descripcion: string | null;
  resumen: string | null;
  colorHex: string | null;
  facultadId: string | null;
  escuelaId: string | null;
  activo: boolean;
  requisitos: RequisitoSalidaDto[];
}

export function mapearTramiteASalidaDto(tramite: Tramite): TramiteSalidaDto {
  return {
    id: tramite.id,
    codigo: tramite.codigo,
    titulo: tramite.titulo,
    descripcion: tramite.descripcion,
    resumen: tramite.resumen,
    colorHex: tramite.colorHex,
    facultadId: tramite.facultadId,
    escuelaId: tramite.escuelaId,
    activo: tramite.activo,
    requisitos: tramite.requisitos.map((req) => ({
      id: req.id,
      titulo: req.titulo,
      descripcion: req.descripcion,
      obligatorio: req.obligatorio,
      orden: req.orden,
    })),
  };
}
