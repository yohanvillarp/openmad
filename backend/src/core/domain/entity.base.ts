/**
 * Clase base abstracta para entidades de dominio.
 * En Arquitectura Hexagonal, el dominio es agnóstico del framework y tecnologías de persistencia.
 */
export abstract class Entity<TId = string> {
  protected readonly _id: TId;

  constructor(id: TId) {
    this._id = id;
  }

  get id(): TId {
    return this._id;
  }

  /**
   * Compara igualdad de entidades basándose en su identificador único.
   */
  equals(other?: Entity<TId>): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (this === other) {
      return true;
    }
    return this._id === other._id;
  }
}
