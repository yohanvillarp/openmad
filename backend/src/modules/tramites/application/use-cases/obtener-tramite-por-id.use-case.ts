import { Inject, Injectable } from '@nestjs/common';
import {
  type TramiteRepositoryPort,
  TRAMITE_REPOSITORY_PORT,
} from '../../domain/ports/tramite-repository.port.js';
import { TramiteNoEncontradoException } from '../../domain/exceptions/tramite-no-encontrado.exception.js';
import {
  type TramiteSalidaDto,
  mapearTramiteASalidaDto,
} from '../dtos/tramite-salida.dto.js';

@Injectable()
export class ObtenerTramitePorIdUseCase {
  constructor(
    @Inject(TRAMITE_REPOSITORY_PORT)
    private readonly tramiteRepository: TramiteRepositoryPort,
  ) {}

  async ejecutar(idOCodigo: string): Promise<TramiteSalidaDto> {
    let tramite = await this.tramiteRepository.buscarPorId(idOCodigo);

    if (!tramite) {
      tramite = await this.tramiteRepository.buscarPorCodigo(idOCodigo);
    }

    if (!tramite) {
      throw new TramiteNoEncontradoException(idOCodigo);
    }

    return mapearTramiteASalidaDto(tramite);
  }
}
