import { Entity } from '../../../../core/domain/entity.base.js';

export interface RequisitoProps {
  tramiteId: string;
  titulo: string;
  descripcion?: string | null;
  obligatorio?: boolean;
  orden?: number;
}

export class Requisito extends Entity<string> {
  private readonly _tramiteId: string;
  private _titulo: string;
  private _descripcion: string | null;
  private _obligatorio: boolean;
  private _orden: number;

  private constructor(id: string, props: RequisitoProps) {
    super(id);
    this._tramiteId = props.tramiteId;
    this._titulo = props.titulo;
    this._descripcion = props.descripcion ?? null;
    this._obligatorio = props.obligatorio ?? true;
    this._orden = props.orden ?? 0;
  }

  static crear(id: string, props: RequisitoProps): Requisito {
    if (!props.titulo || props.titulo.trim().length === 0) {
      throw new Error('El título del requisito es obligatorio.');
    }
    return new Requisito(id, props);
  }

  get tramiteId(): string {
    return this._tramiteId;
  }

  get titulo(): string {
    return this._titulo;
  }

  get descripcion(): string | null {
    return this._descripcion;
  }

  get obligatorio(): boolean {
    return this._obligatorio;
  }

  get orden(): number {
    return this._orden;
  }
}
