import { Injectable } from '@nestjs/common';
import {
  type TramiteRepositoryPort,
  type FiltrosTramite,
} from '../../../domain/ports/tramite-repository.port.js';
import { Tramite } from '../../../domain/entities/tramite.entity.js';
import { Requisito } from '../../../domain/entities/requisito.entity.js';

@Injectable()
export class InMemoryTramiteRepository implements TramiteRepositoryPort {
  private readonly items: Map<string, Tramite> = new Map();

  constructor() {
    this.cargarDatosIniciales();
  }

  async guardar(tramite: Tramite): Promise<void> {
    this.items.set(tramite.id, tramite);
  }

  async buscarPorId(id: string): Promise<Tramite | null> {
    const tramite = this.items.get(id);
    return tramite ?? null;
  }

  async buscarPorCodigo(codigo: string): Promise<Tramite | null> {
    for (const tramite of this.items.values()) {
      if (tramite.codigo === codigo) {
        return tramite;
      }
    }
    return null;
  }

  async listar(filtros?: FiltrosTramite): Promise<Tramite[]> {
    let resultados = Array.from(this.items.values());

    if (filtros?.facultadId) {
      resultados = resultados.filter((t) => t.facultadId === filtros.facultadId);
    }

    if (filtros?.escuelaId) {
      resultados = resultados.filter((t) => t.escuelaId === filtros.escuelaId);
    }

    if (filtros?.activo !== undefined) {
      resultados = resultados.filter((t) => t.activo === filtros.activo);
    }

    return resultados;
  }

  private cargarDatosIniciales(): void {
    const practicas = Tramite.crear('tramite-1', {
      codigo: 'practicas-preprofesionales',
      titulo: 'Prácticas preprofesionales',
      resumen: 'Gestiona los documentos, desarrollo, informe y sustentación de prácticas preprofesionales.',
      colorHex: '#0d9488',
      facultadId: 'ingenieria',
      escuelaId: 'sistemas-informatica',
      activo: true,
      requisitos: [
        Requisito.crear('req-1', {
          tramiteId: 'tramite-1',
          titulo: 'Créditos aprobados según carrera',
          descripcion: 'Tener aprobado el total de créditos establecidos en el reglamento para iniciar prácticas.',
          obligatorio: true,
          orden: 1,
        }),
      ],
    });

    const tesis = Tramite.crear('tramite-2', {
      codigo: 'tesis',
      titulo: 'Tesis',
      resumen: 'Del plan a la sustentación: asesoría, documentos y plazos en un solo hilo.',
      colorHex: '#1e3a8a',
      activo: true,
    });

    const bachiller = Tramite.crear('tramite-3', {
      codigo: 'grado-bachiller',
      titulo: 'Grado de bachiller',
      resumen: 'Requisitos de egreso, constancias y pagos para que te reconozcan el grado.',
      colorHex: '#22c55e',
      activo: true,
    });

    const titulo = Tramite.crear('tramite-4', {
      codigo: 'titulo-profesional',
      titulo: 'Título profesional',
      resumen: 'Ruta para titularte con formatos, costos referenciales y documentación.',
      colorHex: '#f54477',
      activo: true,
    });

    this.items.set(practicas.id, practicas);
    this.items.set(tesis.id, tesis);
    this.items.set(bachiller.id, bachiller);
    this.items.set(titulo.id, titulo);
  }
}
