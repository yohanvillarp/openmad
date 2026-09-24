import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class ConsultaTramitesQueryDto {
  @ApiPropertyOptional({
    description: 'Filtrar por identificador de la facultad (ej. ingenieria)',
    example: 'ingenieria',
  })
  @IsOptional()
  @IsString()
  facultadId?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por identificador de la escuela profesional (ej. sistemas-informatica)',
    example: 'sistemas-informatica',
  })
  @IsOptional()
  @IsString()
  escuelaId?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por estado activo (true o false)',
    example: true,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true || value === 1 || value === '1') return true;
    if (value === 'false' || value === false || value === 0 || value === '0') return false;
    return value;
  })
  @IsBoolean()
  activo?: boolean;
}

export class RequisitoHttpDto {
  @ApiProperty({ example: 'req-1' })
  id!: string;

  @ApiProperty({ example: 'Créditos aprobados según carrera' })
  titulo!: string;

  @ApiPropertyOptional({ example: 'Tener aprobado el mínimo de créditos establecido en el reglamento.' })
  descripcion!: string | null;

  @ApiProperty({ example: true })
  obligatorio!: boolean;

  @ApiProperty({ example: 1 })
  orden!: number;
}

export class RespuestaTramiteHttpDto {
  @ApiProperty({ example: 'tramite-1' })
  id!: string;

  @ApiProperty({ example: 'practicas-preprofesionales' })
  codigo!: string;

  @ApiProperty({ example: 'Prácticas preprofesionales' })
  titulo!: string;

  @ApiPropertyOptional({ example: 'Detalle del trámite...' })
  descripcion!: string | null;

  @ApiPropertyOptional({ example: 'Gestiona documentos e informe de prácticas.' })
  resumen!: string | null;

  @ApiPropertyOptional({ example: '#0d9488' })
  colorHex!: string | null;

  @ApiPropertyOptional({ example: 'ingenieria' })
  facultadId!: string | null;

  @ApiPropertyOptional({ example: 'sistemas-informatica' })
  escuelaId!: string | null;

  @ApiProperty({ example: true })
  activo!: boolean;

  @ApiProperty({ type: [RequisitoHttpDto] })
  requisitos!: RequisitoHttpDto[];
}
