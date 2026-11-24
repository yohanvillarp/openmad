import React from 'react';
import {
  Layers,
  DollarSign,
  FileText,
  AlertTriangle,
  ShieldCheck,
  GripVertical,
  Plus,
  Copy,
  CheckSquare,
  Clock,
  Paperclip,
} from 'lucide-react';
import type { PalettePieceType } from '../types';

export interface PaletteItemDef {
  type: PalettePieceType;
  label: string;
  sub: string;
  gradient: string;
  border: string;
  icon: React.ElementType;
}

const STEP_BLOCK: PaletteItemDef = {
  type: 'step',
  label: 'Paso de Trámite',
  sub: 'Bloque vertebral principal',
  gradient: 'from-[#0ea5e9] to-[#0284c7]',
  border: '#0284c7',
  icon: Layers,
};

const PIECES: PaletteItemDef[] = [
  {
    type: 'cost',
    label: 'Tasa / Costo Caja',
    sub: 'Arancel y ventanilla',
    gradient: 'from-[#f97316] to-[#ea580c]',
    border: '#ea580c',
    icon: DollarSign,
  },
  {
    type: 'drive',
    label: 'Plantilla Drive / DOCX',
    sub: 'Formato descargable',
    gradient: 'from-[#a855f7] to-[#7e22ce]',
    border: '#7e22ce',
    icon: FileText,
  },
  {
    type: 'copyBox',
    label: 'Caja de Copiado',
    sub: 'Plantilla de correo/mesa partes',
    gradient: 'from-[#0284c7] to-[#0369a1]',
    border: '#0369a1',
    icon: Copy,
  },
  {
    type: 'checklist',
    label: 'Auditoría / Checklist',
    sub: 'Secciones de control y formato',
    gradient: 'from-[#6366f1] to-[#4338ca]',
    border: '#4338ca',
    icon: CheckSquare,
  },
  {
    type: 'infoPanel',
    label: 'Plazos por Carrera',
    sub: 'Tabla comparativa de tiempos',
    gradient: 'from-[#d97706] to-[#b45309]',
    border: '#b45309',
    icon: Clock,
  },
  {
    type: 'validity',
    label: 'Validación / Firma',
    sub: 'Sello de autoridad o jurado',
    gradient: 'from-[#10b981] to-[#047857]',
    border: '#047857',
    icon: ShieldCheck,
  },
  {
    type: 'alert',
    label: 'Alerta de Comunidad',
    sub: 'Advertencia crítica de alumno',
    gradient: 'from-[#f43f5e] to-[#be123c]',
    border: '#be123c',
    icon: AlertTriangle,
  },
  {
    type: 'attachment',
    label: 'Reglamento Adjunto',
    sub: 'Resolución o norma oficial',
    gradient: 'from-[#64748b] to-[#475569]',
    border: '#475569',
    icon: Paperclip,
  },
];

interface PaletteBlocksProps {
  onAddBlock: (type: PalettePieceType) => void;
  onDragStartFromPalette: (e: React.DragEvent, type: PalettePieceType) => void;
}

export const PaletteBlocks: React.FC<PaletteBlocksProps> = ({
  onAddBlock,
  onDragStartFromPalette,
}) => {
  return (
    <div className="space-y-4">
      {/* 1. Main Step Block */}
      <div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] font-bold block mb-1.5">
          1. Bloque de Estructura
        </span>
        <div
          draggable
          onDragStart={(e) => onDragStartFromPalette(e, STEP_BLOCK.type)}
          className="p-3 rounded-xl bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] border border-sky-400 text-white shadow-md cursor-grab active:cursor-grabbing hover:scale-[1.01] transition-transform select-none flex items-center justify-between group"
        >
          <div className="flex items-center gap-2 min-w-0">
            <GripVertical className="w-4 h-4 opacity-70 group-hover:opacity-100 shrink-0" />
            <Layers className="w-4 h-4 shrink-0 text-white" />
            <div className="truncate">
              <span className="text-xs font-bold block truncate drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
                {STEP_BLOCK.label}
              </span>
              <span className="text-[10px] opacity-85 font-mono block truncate">
                {STEP_BLOCK.sub}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onAddBlock('step')}
            className="p-1 rounded-lg bg-black/25 hover:bg-black/50 text-white shrink-0 transition-colors ml-1"
            title="Añadir nuevo paso"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Sub-Pieces to Attach */}
      <div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] font-bold block mb-1.5">
          2. Piezas para Acoplar al Paso ({PIECES.length})
        </span>
        <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
          {PIECES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.type}
                draggable
                onDragStart={(e) => onDragStartFromPalette(e, item.type)}
                className={`p-2 rounded-xl bg-gradient-to-r ${item.gradient} border text-white shadow-sm cursor-grab active:cursor-grabbing hover:scale-[1.01] transition-transform select-none flex items-center justify-between group`}
                style={{ borderColor: item.border }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <GripVertical className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 shrink-0" />
                  <Icon className="w-3.5 h-3.5 shrink-0 text-white" />
                  <div className="truncate">
                    <span className="text-[11px] font-bold block truncate drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
                      {item.label}
                    </span>
                    <span className="text-[9px] opacity-80 font-mono block truncate">
                      {item.sub}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onAddBlock(item.type)}
                  className="p-1 rounded-lg bg-black/25 hover:bg-black/50 text-white shrink-0 transition-colors ml-1"
                  title={`Acoplar ${item.label}`}
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
