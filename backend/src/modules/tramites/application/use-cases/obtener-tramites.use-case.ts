import { Inject, Injectable } from '@nestjs/common';
import {
  type TramiteRepositoryPort,
  TRAMITE_REPOSITORY_PORT,
  type FiltrosTramite,
} from '../../domain/ports/tramite-repository.port.js';
import {
  type TramiteSalidaDto,
  mapearTramiteASalidaDto,
} from '../dtos/tramite-salida.dto.js';

export interface ObtenerTramitesConsulta {
  facultadId?: string;
  escuelaId?: string;
  activo?: boolean;
}

@Injectable()
export class ObtenerTramitesUseCase {
  constructor(
    @Inject(TRAMITE_REPOSITORY_PORT)
    private readonly tramiteRepository: TramiteRepositoryPort,
  ) {}

  async ejecutar(consulta?: ObtenerTramitesConsulta): Promise<TramiteSalidaDto[]> {
    const filtros: FiltrosTramite = {
      facultadId: consulta?.facultadId,
      escuelaId: consulta?.escuelaId,
      activo: consulta?.activo,
    };

    const tramites = await this.tramiteRepository.listar(filtros);
    return tramites.map(mapearTramiteASalidaDto);
  }
}
