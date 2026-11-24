import React from 'react';
import {
  GripVertical,
  Trash2,
  MapPin,
  Plus,
} from 'lucide-react';
import type { StepItem, PalettePieceType } from '../types';
import { StepDockedPieces } from './StepDockedPieces';

interface PuzzleStepBlockProps {
  step: StepItem;
  index: number;
  isSelected: boolean;
  isExecuting: boolean;
  isDropTarget: boolean;
  onSelect: () => void;
  onDeleteStep: () => void;
  onAddPiece: (piece: PalettePieceType) => void;
  onRemovePiece: (piece: PalettePieceType) => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragOverStep: (e: React.DragEvent) => void;
  onDragLeaveStep: (e: React.DragEvent) => void;
  onDropOnStep: (e: React.DragEvent) => void;
}

export const PuzzleStepBlock: React.FC<PuzzleStepBlockProps> = ({
  step,
  index,
  isSelected,
  isExecuting,
  isDropTarget,
  onSelect,
  onDeleteStep,
  onAddPiece,
  onRemovePiece,
  onDragStart,
  onDragOverStep,
  onDragLeaveStep,
  onDropOnStep,
}) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOverStep}
      onDragLeave={onDragLeaveStep}
      onDrop={onDropOnStep}
      onClick={onSelect}
      className={`relative rounded-2xl transition-all duration-150 cursor-pointer overflow-visible select-none shadow-lg ${
        isDropTarget
          ? 'ring-4 ring-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.6)] scale-[1.015]'
          : isExecuting
          ? 'ring-4 ring-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.7)] scale-[1.01]'
          : isSelected
          ? 'ring-2 ring-[var(--accent-base)] shadow-[var(--accent-glow)]'
          : 'hover:scale-[1.003]'
      }`}
    >
      {/* Top Socket Connector Notch */}
      <div className="absolute -top-[7px] left-8 w-11 h-[7px] z-20 flex justify-center pointer-events-none">
        <svg width="44" height="7" viewBox="0 0 44 7" fill="none">
          <path
            d="M 0 0 L 6 6 L 38 6 L 44 0 Z"
            fill="rgba(10, 15, 26, 0.95)"
            stroke="#0284c7"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Step Header Block (Vibrant Sky/Blue) */}
      <div className="p-3.5 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white rounded-t-2xl relative border-t border-l border-r border-sky-400/50">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <GripVertical className="w-4 h-4 opacity-75 hover:opacity-100 cursor-grab shrink-0" />
            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-black/35 text-white font-mono shadow-inner">
              Paso {index + 1}
            </span>
            <h4 className="text-xs font-black truncate text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {step.label}
            </h4>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteStep();
            }}
            className="p-1 rounded bg-black/20 hover:bg-black/40 text-white transition-colors"
            title="Eliminar paso"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs text-white/95 mt-1 leading-relaxed drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
          {step.summary}
        </p>

        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[10px] font-mono text-white bg-black/35 px-2 py-0.5 rounded-full border border-white/20">
            <MapPin className="w-3 h-3 opacity-80" />
            <span>{step.location}</span>
          </div>

          {/* Quick Attach Pills for Missing Pieces */}
          <div className="flex items-center gap-1 flex-wrap justify-end">
            {!step.cost && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onAddPiece('cost'); }}
                className="px-1.5 py-0.5 rounded bg-black/25 hover:bg-black/45 text-[9px] font-mono text-white flex items-center gap-0.5"
                title="Acoplar Tasa"
              >
                <Plus className="w-2.5 h-2.5" /> Costo
              </button>
            )}
            {!step.drive && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onAddPiece('drive'); }}
                className="px-1.5 py-0.5 rounded bg-black/25 hover:bg-black/45 text-[9px] font-mono text-white flex items-center gap-0.5"
                title="Acoplar Drive"
              >
                <Plus className="w-2.5 h-2.5" /> Drive
              </button>
            )}
            {!step.validity && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onAddPiece('validity'); }}
                className="px-1.5 py-0.5 rounded bg-black/25 hover:bg-black/45 text-[9px] font-mono text-white flex items-center gap-0.5"
                title="Acoplar Validación"
              >
                <Plus className="w-2.5 h-2.5" /> Firma
              </button>
            )}
            {!step.guide?.introAlert && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onAddPiece('alert'); }}
                className="px-1.5 py-0.5 rounded bg-black/25 hover:bg-black/45 text-[9px] font-mono text-white flex items-center gap-0.5"
                title="Acoplar Alerta"
              >
                <Plus className="w-2.5 h-2.5" /> Alerta
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Docked Sub-Pieces Compartment */}
      <StepDockedPieces step={step} onRemovePiece={onRemovePiece} />

      {/* Bottom Protruding Tab Connector */}
      <div className="absolute -bottom-[7px] left-8 w-11 h-[7px] z-30 flex justify-center pointer-events-none">
        <svg width="44" height="7" viewBox="0 0 44 7" fill="none">
          <path d="M 0 0 L 6 6 L 38 6 L 44 0 Z" fill="#0284c7" />
        </svg>
      </div>
    </div>
  );
};
