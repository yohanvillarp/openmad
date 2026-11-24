import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Users,
  BookOpen,
  Plus,
  ChevronRight,
  ShieldCheck,
  Building2,
  FolderTree,
} from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';

interface Faculty {
  id: string;
  name: string;
  dean: string;
  code: string;
  schools: {
    id: string;
    name: string;
    director: string;
    students: number;
    teachers: number;
    accreditationStatus: string;
  }[];
}

const UNAMAD_FACULTIES: Faculty[] = [
  {
    id: 'fac-ing',
    code: 'F-ING',
    name: 'Facultad de Ingeniería',
    dean: 'Dr. Víctor Hugo Huanca',
    schools: [
      {
        id: 'esc-sistemas',
        name: 'Ingeniería de Sistemas e Informática',
        director: 'Mg. Carlos A. Vargas',
        students: 680,
        teachers: 28,
        accreditationStatus: 'Licenciamiento SUNEDU',
      },
      {
        id: 'esc-forestal',
        name: 'Ingeniería Forestal y Medio Ambiente',
        director: 'Dr. Edwin R. Cárdenas',
        students: 540,
        teachers: 24,
        accreditationStatus: 'En Evaluación SINEACE',
      },
      {
        id: 'esc-agro',
        name: 'Ingeniería Agroindustrial',
        director: 'Dra. María Elena Peña',
        students: 420,
        teachers: 19,
        accreditationStatus: 'Licenciamiento SUNEDU',
      },
    ],
  },
  {
    id: 'fac-eco',
    code: 'F-ECO',
    name: 'Facultad de Ecoturismo y Negocios',
    dean: 'Dra. Rosa Amanda Palacios',
    schools: [
      {
        id: 'esc-ecotur',
        name: 'Licenciatura en Ecoturismo',
        director: 'Mg. Roberto Samanez',
        students: 510,
        teachers: 22,
        accreditationStatus: 'Acreditada Internacional',
      },
      {
        id: 'esc-admin',
        name: 'Administración y Negocios Internacionales',
        director: 'Dr. Fernando L. Ticona',
        students: 790,
        teachers: 31,
        accreditationStatus: 'Licenciamiento SUNEDU',
      },
      {
        id: 'esc-conta',
        name: 'Contabilidad y Finanzas',
        director: 'Mg. Juana Delgado',
        students: 640,
        teachers: 25,
        accreditationStatus: 'Licenciamiento SUNEDU',
      },
    ],
  },
  {
    id: 'fac-edu',
    code: 'F-EDU',
    name: 'Facultad de Educación y Humanidades',
    dean: 'Dr. Hernán Cahuana',
    schools: [
      {
        id: 'esc-prim',
        name: 'Educación Primaria e Informática',
        director: 'Dra. Gladys Morales',
        students: 410,
        teachers: 18,
        accreditationStatus: 'Licenciamiento SUNEDU',
      },
      {
        id: 'esc-derecho',
        name: 'Derecho y Ciencias Políticas',
        director: 'Dr. César A. Barrientos',
        students: 720,
        teachers: 29,
        accreditationStatus: 'Proceso Acreditación',
      },
      {
        id: 'esc-enferm',
        name: 'Enfermería y Ciencias de la Salud',
        director: 'Mg. Patricia Villanueva',
        students: 490,
        teachers: 23,
        accreditationStatus: 'Licenciamiento SUNEDU',
      },
    ],
  },
];

export const EstructuraTab: React.FC = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<string>('fac-ing');

  const activeFac = UNAMAD_FACULTIES.find((f) => f.id === selectedFaculty) || UNAMAD_FACULTIES[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[var(--accent-subtle)] text-[var(--accent-base)] border border-[var(--accent-border)]">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[var(--text-main)]">
              Estructura Orgánica & Facultades UNAMAD
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Mapeo de unidades académicas, decanatos y direcciones de escuela profesional
            </p>
          </div>
        </div>

        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
          Nueva Facultad
        </Button>
      </div>

      {/* Overview Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {UNAMAD_FACULTIES.map((fac) => {
          const isSelected = fac.id === selectedFaculty;
          const totalStudents = fac.schools.reduce((acc, s) => acc + s.students, 0);

          return (
            <motion.button
              key={fac.id}
              type="button"
              whileHover={{ y: -2 }}
              onClick={() => setSelectedFaculty(fac.id)}
              className={`p-5 rounded-xl text-left transition-all cursor-pointer border relative overflow-hidden ${
                isSelected
                  ? 'bg-[var(--bg-surface-elevated)] border-[var(--accent-base)] shadow-xl shadow-[var(--accent-glow)]'
                  : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--border-hover)]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent-base)]" />
              )}

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold om-font-mono text-[var(--accent-base)] flex items-center gap-1.5">
                  <FolderTree className="w-3.5 h-3.5" />
                  {fac.code}
                </span>
                <Badge variant={isSelected ? 'accent' : 'neutral'} size="sm">
                  {fac.schools.length} Escuelas
                </Badge>
              </div>

              <h3 className="mt-3 text-base font-bold text-[var(--text-main)]">
                {fac.name}
              </h3>
              <p className="text-xs text-[var(--text-dim)] mt-1">Decano: {fac.dean}</p>

              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[var(--accent-base)]" />
                  Alumnos Matriculados
                </span>
                <span className="font-bold text-[var(--text-main)] om-font-mono">{totalStudents}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Faculty Details */}
      <Card
        title={`Escuelas Profesionales de: ${activeFac.name}`}
        subtitle={`Gestión curricular, vacantes y directores de carrera asignados`}
        badge={
          <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
            Añadir Escuela Profesional
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {activeFac.schools.map((school) => (
            <motion.div
              key={school.id}
              whileHover={{ y: -2 }}
              className="p-5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-[var(--text-main)] leading-snug group-hover:text-[var(--accent-base)] transition-colors">
                    {school.name}
                  </h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-1 shadow-[0_0_8px_#34d399]" />
                </div>
                <p className="mt-2 text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[var(--text-dim)]" />
                  <span className="text-[var(--text-main)]">{school.director}</span>
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <Badge variant="neutral" size="sm">
                    <Users className="w-3 h-3 text-[var(--accent-base)]" />
                    {school.students} Estudiantes
                  </Badge>
                  <Badge variant="neutral" size="sm">
                    <BookOpen className="w-3 h-3 text-[var(--accent-base)]" />
                    {school.teachers} Docentes
                  </Badge>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <span className="text-[11px] text-[var(--text-dim)] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {school.accreditationStatus}
                </span>
                <Button variant="ghost" size="sm" icon={<ChevronRight className="w-3.5 h-3.5" />}>
                  Configurar
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};
