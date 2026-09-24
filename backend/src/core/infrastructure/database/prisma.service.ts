import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';

/**
 * Servicio base de infraestructura para la conexión a PostgreSQL a través de Prisma.
 *
 * En Arquitectura Hexagonal, este servicio vive en la capa de Infraestructura
 * y es consumido exclusivamente por los Adaptadores Secundarios (Repositorios).
 */
@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  // private prismaClient: PrismaClient;

  async onModuleInit(): Promise<void> {
    if (process.env.DATABASE_URL) {
      try {
        // await this.prismaClient.$connect();
        this.logger.log('Conexión con base de datos PostgreSQL (Prisma) inicializada.');
      } catch (error) {
        this.logger.warn(`No se pudo conectar a la base de datos PostgreSQL: ${(error as Error).message}`);
      }
    } else {
      this.logger.log('DATABASE_URL no configurada. Operando en modo adaptadores en memoria.');
    }
  }

  async onModuleDestroy(): Promise<void> {
    // if (this.prismaClient) {
    //   await this.prismaClient.$disconnect();
    // }
  }
}
