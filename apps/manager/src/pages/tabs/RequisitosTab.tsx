import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  CreditCard,
  Camera,
  FileCode2,
  Download,
  Plus,
  SlidersHorizontal,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';

interface Requisito {
  id: string;
  code: string;
  name: string;
  type: 'PDF' | 'Firma Digital' | 'Comprobante de Pago' | 'Foto Digital' | 'Constancia Externa';
  isMandatory: boolean;
  validationMode: 'Automática (API)' | 'Manual (Ventanilla)' | 'Mixta';
  applicableTramites: string[];
}

const REQUISITOS_MOCK: Requisito[] = [
  {
    id: 'req-01',
    code: 'REQ-F01',
    name: 'Formulario Único de Trámite (FUT) debidamente llenado y firmado',
    type: 'PDF',
    isMandatory: true,
    validationMode: 'Automática (API)',
    applicableTramites: ['TUPA-014', 'TUPA-018', 'TUPA-005', 'TUPA-022'],
  },
  {
    id: 'req-02',
    code: 'REQ-BN02',
    name: 'Voucher o Constancia de Pago por Derecho de Trámite (Banco de la Nación / Caja UNAMAD)',
    type: 'Comprobante de Pago',
    isMandatory: true,
    validationMode: 'Automática (API)',
    applicableTramites: ['TUPA-014', 'TUPA-018', 'TUPA-005'],
  },
  {
    id: 'req-03',
    code: 'REQ-TESIS',
    name: 'Acta de Aprobación y Sustentación de Tesis / Trabajo de Investigación',
    type: 'Firma Digital',
    isMandatory: true,
    validationMode: 'Manual (Ventanilla)',
    applicableTramites: ['TUPA-018'],
  },
  {
    id: 'req-04',
    code: 'REQ-ING04',
    name: 'Certificado de Idioma Extranjero / Lengua Nativa (Nivel Intermedio B2)',
    type: 'Constancia Externa',
    isMandatory: true,
    validationMode: 'Mixta',
    applicableTramites: ['TUPA-014', 'TUPA-018'],
  },
  {
    id: 'req-05',
    code: 'REQ-FOTO',
    name: 'Fotografía Tamaño Pasaporte en Fondo Blanco (Formato JPG/PNG, sin retoque)',
    type: 'Foto Digital',
    isMandatory: true,
    validationMode: 'Automática (API)',
    applicableTramites: ['TUPA-014', 'TUPA-018', 'TUPA-031'],
  },
  {
    id: 'req-06',
    code: 'REQ-NOADEU',
    name: 'Constancia Integral de No Adeudo (Biblioteca, Laboratorios, Bienestar Universitario)',
    type: 'PDF',
    isMandatory: true,
    validationMode: 'Automática (API)',
    applicableTramites: ['TUPA-014', 'TUPA-018', 'TUPA-009'],
  },
];

export const RequisitosTab: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = filterType === 'all'
    ? REQUISITOS_MOCK
    : REQUISITOS_MOCK.filter((r) => r.type === filterType);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-3.5 h-3.5 text-blue-400" />;
      case 'Comprobante de Pago':
        return <CreditCard className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Firma Digital':
        return <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-base)]" />;
      case 'Foto Digital':
        return <Camera className="w-3.5 h-3.5 text-amber-400" />;
      case 'Constancia Externa':
      default:
        return <FileCode2 className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] backdrop-blur-xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[var(--accent-subtle)] text-[var(--accent-base)] border border-[var(--accent-border)]">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[var(--text-main)]">
              Catálogo General de Requisitos & Formularios
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Reglas de validación, subida de documentos y comprobación TUPA
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
            Matriz TUPA (PDF)
          </Button>
          <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
            Nuevo Requisito
          </Button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'PDF', 'Comprobante de Pago', 'Firma Digital', 'Foto Digital', 'Constancia Externa'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFilterType(t)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              filterType === t
                ? 'bg-[var(--accent-base)] text-[var(--accent-contrast)] shadow-md shadow-[var(--accent-glow)]'
                : 'bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)]'
            }`}
          >
            {t === 'all' ? 'Todos los Tipos' : t}
          </button>
        ))}
      </div>

      {/* Requisitos List with Motion */}
      <motion.div layout className="space-y-3">
        <AnimatePresence>
          {filtered.map((req) => (
            <motion.div
              layout
              key={req.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="om-card p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold om-font-mono text-[var(--accent-base)]">
                    {req.code}
                  </span>
                  <Badge variant={req.isMandatory ? 'accent' : 'neutral'} size="sm">
                    {req.isMandatory ? 'Obligatorio' : 'Opcional'}
                  </Badge>
                  <Badge variant="neutral" size="sm">
                    {getTypeIcon(req.type)}
                    {req.type}
                  </Badge>
                </div>

                <h3 className="text-sm sm:text-base font-semibold text-[var(--text-main)] group-hover:text-[var(--accent-base)] transition-colors">
                  {req.name}
                </h3>

                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-dim)]">
                  <span>
                    Validación: <strong className="text-[var(--text-muted)]">{req.validationMode}</strong>
                  </span>
                  <span>•</span>
                  <span>Aplica a: {req.applicableTramites.join(', ')}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <Button variant="secondary" size="sm">
                  Plantilla
                </Button>
                <Button variant="outline" size="sm" icon={<SlidersHorizontal className="w-3.5 h-3.5" />}>
                  Reglas
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
