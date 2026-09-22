import { Injectable } from '@nestjs/common';
import type { UnitOfWorkPort } from '../../domain/ports/unit-of-work.port.js';

/**
 * Adaptador de Infraestructura para transacciones con PostgreSQL y Prisma ORM.
 * Implementa el puerto UnitOfWorkPort sin contaminar las capas internas.
 */
@Injectable()
export class PrismaUnitOfWorkAdapter implements UnitOfWorkPort {
  // Cuando Prisma esté conectado, se inyecta:
  // constructor(private readonly prisma: PrismaService) {}

  async ejecutar<T>(operacion: () => Promise<T>): Promise<T> {
    // Conexión activa con transacción interactiva de Prisma:
    // return this.prisma.$transaction(async () => {
    //   return operacion();
    // });
    return operacion();
  }
}
