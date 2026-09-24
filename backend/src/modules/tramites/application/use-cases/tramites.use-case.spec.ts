import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryTramiteRepository } from '../../infrastructure/adapters/in-memory/in-memory-tramite.repository.js';
import { ObtenerTramitesUseCase } from './obtener-tramites.use-case.js';
import { ObtenerTramitePorIdUseCase } from './obtener-tramite-por-id.use-case.js';
import { TramiteNoEncontradoException } from '../../domain/exceptions/tramite-no-encontrado.exception.js';

describe('Tramites Use Cases (Hexagonal Architecture)', () => {
  let repository: InMemoryTramiteRepository;
  let obtenerTramitesUseCase: ObtenerTramitesUseCase;
  let obtenerTramitePorIdUseCase: ObtenerTramitePorIdUseCase;

  beforeEach(() => {
    repository = new InMemoryTramiteRepository();
    obtenerTramitesUseCase = new ObtenerTramitesUseCase(repository);
    obtenerTramitePorIdUseCase = new ObtenerTramitePorIdUseCase(repository);
  });

  it('debe listar todos los trámites precargados', async () => {
    const tramites = await obtenerTramitesUseCase.ejecutar();
    expect(tramites.length).toBeGreaterThanOrEqual(4);
    expect(tramites.some((t) => t.codigo === 'tesis')).toBe(true);
  });

  it('debe filtrar trámites por facultad', async () => {
    const tramites = await obtenerTramitesUseCase.ejecutar({ facultadId: 'ingenieria' });
    expect(tramites.every((t) => t.facultadId === 'ingenieria')).toBe(true);
  });

  it('debe obtener un trámite por código', async () => {
    const tramite = await obtenerTramitePorIdUseCase.ejecutar('practicas-preprofesionales');
    expect(tramite.codigo).toBe('practicas-preprofesionales');
    expect(tramite.requisitos.length).toBeGreaterThan(0);
  });

  it('debe lanzar TramiteNoEncontradoException si el trámite no existe', async () => {
    await expect(
      obtenerTramitePorIdUseCase.ejecutar('codigo-inexistente'),
    ).rejects.toThrow(TramiteNoEncontradoException);
  });
});
