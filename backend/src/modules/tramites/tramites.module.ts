import { Module } from '@nestjs/common';
import { TramitesController } from './infrastructure/controllers/tramites.controller.js';
import { ObtenerTramitesUseCase } from './application/use-cases/obtener-tramites.use-case.js';
import { ObtenerTramitePorIdUseCase } from './application/use-cases/obtener-tramite-por-id.use-case.js';
import { TRAMITE_REPOSITORY_PORT } from './domain/ports/tramite-repository.port.js';
import { InMemoryTramiteRepository } from './infrastructure/adapters/in-memory/in-memory-tramite.repository.js';

@Module({
  controllers: [TramitesController],
  providers: [
    ObtenerTramitesUseCase,
    ObtenerTramitePorIdUseCase,
    {
      provide: TRAMITE_REPOSITORY_PORT,
      // Se utiliza el adaptador en memoria para permitir arranque inmediato sin BD conectada.
      // Cuando la BD esté lista, se sustituye fácilmente por PrismaTramiteRepository sin tocar la lógica de negocio.
      useClass: InMemoryTramiteRepository,
    },
  ],
  exports: [
    ObtenerTramitesUseCase,
    ObtenerTramitePorIdUseCase,
    TRAMITE_REPOSITORY_PORT,
  ],
})
export class TramitesModule {}
