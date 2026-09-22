/**
 * Puerto de Dominio: Unidad de Trabajo (Unit of Work).
 *
 * En Arquitectura Hexagonal, el Dominio y la capa de Aplicación
 * no conocen la tecnología de persistencia (PostgreSQL/Prisma).
 * Este puerto permite encapsular transacciones atómicas de base de datos
 * para que múltiples operaciones de repositorio se confirmen (commit) o
 * se reviertan (rollback) de forma coordinada.
 */
export interface UnitOfWorkPort {
  /**
   * Ejecuta una operación compuesta dentro de una transacción atómica.
   * Si la promesa falla o arroja una excepción, la transacción se revierte automáticamente.
   */
  ejecutar<T>(operacion: () => Promise<T>): Promise<T>;
}

export const UNIT_OF_WORK_PORT = Symbol('UNIT_OF_WORK_PORT');
