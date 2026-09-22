import { Entity } from '../../../../core/domain/entity.base.js';
import type { Requisito } from './requisito.entity.js';

export interface TramiteProps {
  codigo: string;
  titulo: string;
  descripcion?: string | null;
  resumen?: string | null;
  colorHex?: string | null;
  facultadId?: string | null;
  escuelaId?: string | null;
  activo?: boolean;
  requisitos?: Requisito[];
}

export class Tramite extends Entity<string> {
  private readonly _codigo: string;
  private _titulo: string;
  private _descripcion: string | null;
  private _resumen: string | null;
  private _colorHex: string | null;
  private _facultadId: string | null;
  private _escuelaId: string | null;
  private _activo: boolean;
  private _requisitos: Requisito[];

  private constructor(id: string, props: TramiteProps) {
    super(id);
    this._codigo = props.codigo;
    this._titulo = props.titulo;
    this._descripcion = props.descripcion ?? null;
    this._resumen = props.resumen ?? null;
    this._colorHex = props.colorHex ?? null;
    this._facultadId = props.facultadId ?? null;
    this._escuelaId = props.escuelaId ?? null;
    this._activo = props.activo ?? true;
    this._requisitos = props.requisitos ?? [];
  }

  static crear(id: string, props: TramiteProps): Tramite {
    if (!props.codigo || props.codigo.trim().length === 0) {
      throw new Error('El código del trámite es obligatorio.');
    }
    if (!props.titulo || props.titulo.trim().length === 0) {
      throw new Error('El título del trámite es obligatorio.');
    }
    return new Tramite(id, props);
  }

  get codigo(): string {
    return this._codigo;
  }

  get titulo(): string {
    return this._titulo;
  }

  get descripcion(): string | null {
    return this._descripcion;
  }

  get resumen(): string | null {
    return this._resumen;
  }

  get colorHex(): string | null {
    return this._colorHex;
  }

  get facultadId(): string | null {
    return this._facultadId;
  }

  get escuelaId(): string | null {
    return this._escuelaId;
  }

  get activo(): boolean {
    return this._activo;
  }

  get requisitos(): readonly Requisito[] {
    return [...this._requisitos];
  }

  agregarRequisito(requisito: Requisito): void {
    this._requisitos.push(requisito);
  }

  desactivar(): void {
    this._activo = false;
  }

  activar(): void {
    this._activo = true;
  }
}
