/**
 * Clase base para excepciones originadas en la capa de Dominio o Aplicación.
 * Permite que el núcleo del negocio defina errores semánticos sin depender de códigos de estado HTTP ni de NestJS.
 */
export abstract class DomainException extends Error {
  public abstract readonly code: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
