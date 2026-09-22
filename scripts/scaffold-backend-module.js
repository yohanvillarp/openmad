#!/usr/bin/env node
/**
 * scripts/scaffold-backend-module.js
 * Generador automatizado de modulos con Arquitectura Hexagonal para NestJS.
 * Uso:
 *   node scripts/scaffold-backend-module.js <nombre-modulo>
 * Ejemplo:
 *   node scripts/scaffold-backend-module.js estudiantes
 */

import fs from 'node:fs';
import path from 'node:path';

const moduleName = process.argv[2];

if (!moduleName) {
  console.error(':: Error: Debes especificar el nombre del modulo.');
  console.error(':: Uso: node scripts/scaffold-backend-module.js <nombre-modulo>');
  process.exit(1);
}

// Transformaciones de nombres
const kebab = moduleName.toLowerCase().replace(/[^a-z0-9]/g, '-');
const camel = kebab.replace(/-([a-z0-9])/g, (_, g) => g.toUpperCase());
const pascal = camel.charAt(0).toUpperCase() + camel.slice(1);
const singularPascal = pascal.endsWith('s') ? pascal.slice(0, -1) : pascal;
const singularKebab = kebab.endsWith('s') ? kebab.slice(0, -1) : kebab;

const repoRoot = path.resolve(import.meta.dirname, '..');
const targetDir = path.join(repoRoot, 'backend', 'src', 'modules', kebab);

if (fs.existsSync(targetDir)) {
  console.error(`:: Error: El modulo '${kebab}' ya existe en: ${targetDir}`);
  process.exit(1);
}

console.log(`:: Generando modulo hexagonal: ${kebab} (${pascal}Module)...`);

// 1. Domain Entity
const entityContent = `export interface ${singularPascal}Props {
  id?: string;
  nombre: string;
  activo?: boolean;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}

export class ${singularPascal} {
  private readonly _id?: string;
  private _nombre: string;
  private _activo: boolean;
  private readonly _fechaCreacion: Date;
  private _fechaActualizacion: Date;

  constructor(props: ${singularPascal}Props) {
    this._id = props.id;
    this._nombre = props.nombre;
    this._activo = props.activo ?? true;
    this._fechaCreacion = props.fechaCreacion ?? new Date();
    this._fechaActualizacion = props.fechaActualizacion ?? new Date();
  }

  get id(): string | undefined {
    return this._id;
  }

  get nombre(): string {
    return this._nombre;
  }

  get activo(): boolean {
    return this._activo;
  }

  get fechaCreacion(): Date {
    return this._fechaCreacion;
  }

  get fechaActualizacion(): Date {
    return this._fechaActualizacion;
  }
}
`;

// 2. Domain Repository Port
const portContent = `import { ${singularPascal} } from '../entities/${singularKebab}.entity.js';

export const ${pascal}RepositoryToken = Symbol('${pascal}RepositoryPort');

export interface ${pascal}RepositoryPort {
  listar(): Promise<${singularPascal}[]>;
  buscarPorId(id: string): Promise<${singularPascal} | null>;
  guardar(item: ${singularPascal}): Promise<${singularPascal}>;
}
`;

// 3. Domain Exception
const exceptionContent = `export class ${singularPascal}NoEncontradoException extends Error {
  constructor(id: string) {
    super(\`${singularPascal} con ID '\${id}' no fue encontrado\`);
    this.name = '${singularPascal}NoEncontradoException';
  }
}
`;

// 4. Application DTO
const dtoContent = `import { ${singularPascal} } from '../../domain/entities/${singularKebab}.entity.js';

export class ${singularPascal}SalidaDto {
  id?: string;
  nombre: string;
  activo: boolean;
  fechaCreacion: Date;

  static desdeEntidad(entidad: ${singularPascal}): ${singularPascal}SalidaDto {
    const dto = new ${singularPascal}SalidaDto();
    dto.id = entidad.id;
    dto.nombre = entidad.nombre;
    dto.activo = entidad.activo;
    dto.fechaCreacion = entidad.fechaCreacion;
    return dto;
  }
}
`;

// 5. Application Use Case
const useCaseContent = `import { Inject, Injectable } from '@nestjs/common';
import { ${pascal}RepositoryPort, ${pascal}RepositoryToken } from '../../domain/ports/${singularKebab}.repository.port.js';
import { ${singularPascal}SalidaDto } from '../dtos/${singularKebab}-salida.dto.js';

@Injectable()
export class Obtener${pascal}UseCase {
  constructor(
    @Inject(${pascal}RepositoryToken)
    private readonly repository: ${pascal}RepositoryPort,
  ) {}

  async ejecutar(): Promise<${singularPascal}SalidaDto[]> {
    const items = await this.repository.listar();
    return items.map((item) => ${singularPascal}SalidaDto.desdeEntidad(item));
  }
}
`;

// 6. Infrastructure Adapter
const adapterContent = `import { Injectable } from '@nestjs/common';
import { ${singularPascal} } from '../../domain/entities/${singularKebab}.entity.js';
import { ${pascal}RepositoryPort } from '../../domain/ports/${singularKebab}.repository.port.js';

@Injectable()
export class InMemory${pascal}Repository implements ${pascal}RepositoryPort {
  private items: ${singularPascal}[] = [];

  async listar(): Promise<${singularPascal}[]> {
    return [...this.items];
  }

  async buscarPorId(id: string): Promise<${singularPascal} | null> {
    return this.items.find((item) => item.id === id) ?? null;
  }

  async guardar(item: ${singularPascal}): Promise<${singularPascal}> {
    this.items.push(item);
    return item;
  }
}
`;

// 7. Infrastructure Controller
const controllerContent = `import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Obtener${pascal}UseCase } from '../application/use-cases/obtener-${kebab}.use-case.js';
import { ${singularPascal}SalidaDto } from '../application/dtos/${singularKebab}-salida.dto.js';

@ApiTags('${pascal}')
@Controller('${kebab}')
export class ${pascal}Controller {
  constructor(private readonly obtener${pascal}UseCase: Obtener${pascal}UseCase) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los elementos de ${kebab}' })
  @ApiResponse({ status: 200, type: [${singularPascal}SalidaDto] })
  async listar(): Promise<${singularPascal}SalidaDto[]> {
    return this.obtener${pascal}UseCase.ejecutar();
  }
}
`;

// 8. NestJS Module
const moduleContent = `import { Module } from '@nestjs/common';
import { ${pascal}Controller } from './infrastructure/controllers/${kebab}.controller.js';
import { Obtener${pascal}UseCase } from './application/use-cases/obtener-${kebab}.use-case.js';
import { ${pascal}RepositoryToken } from './domain/ports/${singularKebab}.repository.port.js';
import { InMemory${pascal}Repository } from './infrastructure/adapters/in-memory-${kebab}.repository.js';

@Module({
  controllers: [${pascal}Controller],
  providers: [
    Obtener${pascal}UseCase,
    {
      provide: ${pascal}RepositoryToken,
      useClass: InMemory${pascal}Repository,
    },
  ],
  exports: [${pascal}RepositoryToken, Obtener${pascal}UseCase],
})
export class ${pascal}Module {}
`;

// Crear estructura
const files = [
  { path: `domain/entities/${singularKebab}.entity.ts`, content: entityContent },
  { path: `domain/ports/${singularKebab}.repository.port.ts`, content: portContent },
  { path: `domain/exceptions/${singularKebab}-no-encontrado.exception.ts`, content: exceptionContent },
  { path: `application/dtos/${singularKebab}-salida.dto.ts`, content: dtoContent },
  { path: `application/use-cases/obtener-${kebab}.use-case.ts`, content: useCaseContent },
  { path: `infrastructure/adapters/in-memory-${kebab}.repository.ts`, content: adapterContent },
  { path: `infrastructure/controllers/${kebab}.controller.ts`, content: controllerContent },
  { path: `${kebab}.module.ts`, content: moduleContent },
];

for (const f of files) {
  const fullPath = path.join(targetDir, f.path);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, f.content, 'utf8');
  console.log(`  + Creado: backend/src/modules/${kebab}/${f.path}`);
}

console.log(`:: Modulo '${pascal}Module' creado exitosamente con arquitectura hexagonal.`);
console.log(`:: Recuerda registrar '${pascal}Module' en 'backend/src/app.module.ts'.`);
