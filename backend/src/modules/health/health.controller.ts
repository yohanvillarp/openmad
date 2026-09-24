import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({
    summary: 'Verificar estado del servicio',
    description: 'Comprueba el estado operativo del servicio, consumo de memoria y diagnóstico general.',
  })
  @ApiResponse({
    status: 200,
    description: 'El servicio está saludable y en funcionamiento.',
  })
  check() {
    return this.health.check([
      () => this.memory.checkHeap('memoria_heap', 300 * 1024 * 1024),
    ]);
  }
}
