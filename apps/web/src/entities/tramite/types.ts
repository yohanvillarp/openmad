export type EstadoTramite = 'LOCKED' | 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED';
export type TipoNodoTramite = 'ruta' | 'modulo' | 'paso' | 'hito';

export type Tramite = Record<string, unknown> & {
  id: string;
  titulo: string;
  estado: EstadoTramite;
  tipoNodo?: TipoNodoTramite;
  costo?: number;
  duracionDias?: number;
};
