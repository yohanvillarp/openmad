import type { Tramite } from '../entities/tramite.entity.js';

export interface FiltrosTramite {
  facultadId?: string;
  escuelaId?: string;
  activo?: boolean;
}

export interface TramiteRepositoryPort {
  guardar(tramite: Tramite): Promise<void>;
  buscarPorId(id: string): Promise<Tramite | null>;
  buscarPorCodigo(codigo: string): Promise<Tramite | null>;
  listar(filtros?: FiltrosTramite): Promise<Tramite[]>;
}

export const TRAMITE_REPOSITORY_PORT = Symbol('TRAMITE_REPOSITORY_PORT');
