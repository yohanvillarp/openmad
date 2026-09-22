import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { ObtenerTramitesUseCase } from '../../application/use-cases/obtener-tramites.use-case.js';
import { ObtenerTramitePorIdUseCase } from '../../application/use-cases/obtener-tramite-por-id.use-case.js';
import {
  ConsultaTramitesQueryDto,
  RespuestaTramiteHttpDto,
} from './dtos/tramite-http.dto.js';

@ApiTags('Trámites')
@Controller('tramites')
export class TramitesController {
  constructor(
    private readonly obtenerTramitesUseCase: ObtenerTramitesUseCase,
    private readonly obtenerTramitePorIdUseCase: ObtenerTramitePorIdUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar trámites académicos',
    description: 'Retorna la lista de trámites académicos disponibles, permitiendo filtros por facultad, escuela y estado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de trámites obtenida satisfactoriamente.',
    type: [RespuestaTramiteHttpDto],
  })
  async listar(
    @Query() query: ConsultaTramitesQueryDto,
  ): Promise<RespuestaTramiteHttpDto[]> {
    return this.obtenerTramitesUseCase.ejecutar({
      facultadId: query.facultadId,
      escuelaId: query.escuelaId,
      activo: query.activo,
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener trámite por identificador o código',
    description: 'Retorna la información detallada de un trámite académico junto a sus requisitos.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único o código amigable del trámite (ej. practicas-preprofesionales)',
    example: 'practicas-preprofesionales',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalle del trámite encontrado.',
    type: RespuestaTramiteHttpDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Trámite no encontrado.',
  })
  async obtenerPorId(
    @Param('id') id: string,
  ): Promise<RespuestaTramiteHttpDto> {
    return this.obtenerTramitePorIdUseCase.ejecutar(id);
  }
}
