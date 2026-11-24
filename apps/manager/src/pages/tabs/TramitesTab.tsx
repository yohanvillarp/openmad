import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  FileCheck2,
  DollarSign,
  Clock,
  Settings2,
  Sparkles,
} from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';

interface TramiteItem {
  id: string;
  code: string;
  name: string;
  category: 'Grados' | 'Matrícula' | 'Certificación' | 'Bienestar';
  cost: string;
  duration: string;
  dependencia: string;
  requirementsCount: number;
  isActive: boolean;
}

const TRAMITES_DATA: TramiteItem[] = [
  {
    id: 't-1',
    code: 'TUPA-014',
    name: 'Expedición de Diploma de Grado Académico de Bachiller',
    category: 'Grados',
    cost: 'S/. 350.00',
    duration: '15 días hábiles',
    dependencia: 'Secretaría General / Registros Académicos',
    requirementsCount: 6,
    isActive: true,
  },
  {
    id: 't-2',
    code: 'TUPA-018',
    name: 'Expedición de Título Profesional (Tesis / Trabajo de Suficiencia)',
    category: 'Grados',
    cost: 'S/. 580.00',
    duration: '30 días hábiles',
    dependencia: 'Facultad correspondiente & Decanato',
    requirementsCount: 9,
    isActive: true,
  },
  {
    id: 't-3',
    code: 'TUPA-005',
    name: 'Certificado Oficial de Estudios Universitarios (Por Ciclo/Total)',
    category: 'Certificación',
    cost: 'S/. 45.00',
    duration: '3 días hábiles',
    dependencia: 'Dirección de Asuntos Académicos',
    requirementsCount: 3,
    isActive: true,
  },
  {
    id: 't-4',
    code: 'TUPA-022',
    name: 'Convalidación y Reconocimiento de Asignaturas (Traslado Ext/Int)',
    category: 'Matrícula',
    cost: 'S/. 120.00',
    duration: '20 días hábiles',
    dependencia: 'Comisión Curricular de Escuela',
    requirementsCount: 5,
    isActive: true,
  },
  {
    id: 't-5',
    code: 'TUPA-009',
    name: 'Reserva o Reactualización de Matrícula Regular',
    category: 'Matrícula',
    cost: 'Gratuito',
    duration: '2 días hábiles',
    dependencia: 'Unidad de Matrícula y Registros',
    requirementsCount: 2,
    isActive: true,
  },
  {
    id: 't-6',
    code: 'TUPA-031',
    name: 'Carné Universitario Regular / Duplicado por Pérdida',
    category: 'Bienestar',
    cost: 'S/. 16.00',
    duration: 'Sujeto a SUNEDU',
    dependencia: 'Dirección de Bienestar Universitario',
    requirementsCount: 3,
    isActive: true,
  },
];

export const TramitesTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredTramites = TRAMITES_DATA.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dependencia.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] backdrop-blur-xl shadow-lg">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por código TUPA, nombre del trámite o dependencia..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none focus:border-[var(--accent-base)] transition-colors"
          />
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[var(--text-dim)]" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {['all', 'Grados', 'Matrícula', 'Certificación', 'Bienestar'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                categoryFilter === cat
                  ? 'bg-[var(--accent-base)] text-[var(--accent-contrast)] shadow-md shadow-[var(--accent-glow)]'
                  : 'bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-subtle)]'
              }`}
            >
              {cat === 'all' ? 'Todos los Trámites' : cat}
            </button>
          ))}
        </div>

        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} className="shrink-0">
          Nuevo Trámite
        </Button>
      </div>

      {/* Grid of Procedures with Animated Layout */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {filteredTramites.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                title={item.name}
                subtitle={item.dependencia}
                badge={
                  <Badge variant="accent" size="sm">
                    <Sparkles className="w-3 h-3" />
                    {item.code}
                  </Badge>
                }
                footer={
                  <div className="w-full flex items-center justify-between text-xs">
                    <span className="text-[var(--text-dim)] flex items-center gap-1.5">
                      <FileCheck2 className="w-3.5 h-3.5 text-[var(--accent-base)]" />
                      {item.requirementsCount} requisitos
                    </span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" icon={<Settings2 className="w-3.5 h-3.5" />}>
                        Flujo
                      </Button>
                    </div>
                  </div>
                }
              >
                <div className="grid grid-cols-2 gap-3 py-2 text-xs">
                  <div className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                    <span className="flex items-center gap-1 text-[10px] text-[var(--text-dim)] uppercase om-font-mono">
                      <DollarSign className="w-3 h-3 text-[var(--accent-base)]" />
                      Derecho TUPA
                    </span>
                    <span className="font-bold text-sm text-[var(--accent-base)] mt-1 block om-font-display">
                      {item.cost}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                    <span className="flex items-center gap-1 text-[10px] text-[var(--text-dim)] uppercase om-font-mono">
                      <Clock className="w-3 h-3 text-[var(--text-muted)]" />
                      Plazo Máximo
                    </span>
                    <span className="font-semibold text-xs text-[var(--text-main)] mt-1 block">
                      {item.duration}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
