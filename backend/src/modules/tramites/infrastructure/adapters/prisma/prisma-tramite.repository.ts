import { Injectable } from '@nestjs/common';
import {
  type TramiteRepositoryPort,
  type FiltrosTramite,
} from '../../../domain/ports/tramite-repository.port.js';
import { Tramite } from '../../../domain/entities/tramite.entity.js';
import { Requisito } from '../../../domain/entities/requisito.entity.js';

/**
 * Adaptador secundario (Driven Adapter) para persistencia con PostgreSQL y Prisma.
 *
 * Cumple con la regla del proyecto:
 * Todos los campos de la base de datos están en español respetando el formato estándar (snake_case en BD,
 * mapeados a camelCase en TypeScript mediante @map y @@map en schema.prisma).
 */
@Injectable()
export class PrismaTramiteRepository implements TramiteRepositoryPort {
  // Cuando se ejecute 'npx prisma generate' y se conecte la BD PostgreSQL,
  // se inyecta PrismaService aquí: constructor(private readonly prisma: PrismaService) {}

  async guardar(_tramite: Tramite): Promise<void> {
    // Ejemplo de inserción/actualización con Prisma ORM respetando la arquitectura:
    // await this.prisma.tramite.upsert({
    //   where: { id: _tramite.id },
    //   update: {
    //     titulo: _tramite.titulo,
    //     descripcion: _tramite.descripcion,
    //     resumen: _tramite.resumen,
    //     colorHex: _tramite.colorHex,
    //     facultadId: _tramite.facultadId,
    //     escuelaId: _tramite.escuelaId,
    //     activo: _tramite.activo,
    //   },
    //   create: {
    //     id: _tramite.id,
    //     codigo: _tramite.codigo,
    //     titulo: _tramite.titulo,
    //     descripcion: _tramite.descripcion,
    //     resumen: _tramite.resumen,
    //     colorHex: _tramite.colorHex,
    //     facultadId: _tramite.facultadId,
    //     escuelaId: _tramite.escuelaId,
    //     activo: _tramite.activo,
    //   },
    // });
  }

  async buscarPorId(_id: string): Promise<Tramite | null> {
    // const registro = await this.prisma.tramite.findUnique({
    //   where: { id: _id },
    //   include: { requisitos: true },
    // });
    // if (!registro) return null;
    // return this.aEntidadDominio(registro);
    return null;
  }

  async buscarPorCodigo(_codigo: string): Promise<Tramite | null> {
    // const registro = await this.prisma.tramite.findUnique({
    //   where: { codigo: _codigo },
    //   include: { requisitos: true },
    // });
    // if (!registro) return null;
    // return this.aEntidadDominio(registro);
    return null;
  }

  async listar(_filtros?: FiltrosTramite): Promise<Tramite[]> {
    // const registros = await this.prisma.tramite.findMany({
    //   where: {
    //     facultadId: _filtros?.facultadId,
    //     escuelaId: _filtros?.escuelaId,
    //     activo: _filtros?.activo,
    //   },
    //   include: { requisitos: true },
    // });
    // return registros.map(this.aEntidadDominio);
    return [];
  }

  /**
   * Mapea el registro de la base de datos (PostgreSQL/Prisma) a la entidad pura de Dominio.
   */
  private aEntidadDominio(registro: any): Tramite {
    const requisitos = (registro.requisitos ?? []).map((req: any) =>
      Requisito.crear(req.id, {
        tramiteId: req.tramiteId,
        titulo: req.titulo,
        descripcion: req.descripcion,
        obligatorio: req.obligatorio,
        orden: req.orden,
      }),
    );

    return Tramite.crear(registro.id, {
      codigo: registro.codigo,
      titulo: registro.titulo,
      descripcion: registro.descripcion,
      resumen: registro.resumen,
      colorHex: registro.colorHex,
      facultadId: registro.facultadId,
      escuelaId: registro.escuelaId,
      activo: registro.activo,
      requisitos,
    });
  }
}
