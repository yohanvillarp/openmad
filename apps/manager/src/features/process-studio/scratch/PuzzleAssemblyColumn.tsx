import React from 'react';
import { Layers } from 'lucide-react';
import type { StepItem, PalettePieceType } from '../types';
import type { DragItem } from './useStepDragDrop';
import { PuzzleStepBlock } from './PuzzleStepBlock';

interface PuzzleAssemblyColumnProps {
  steps: StepItem[];
  selectedStepId: string;
  onSelectStepId: (id: string) => void;
  onDeleteStep: (index: number) => void;
  onAddPieceToStep: (stepId: string, piece: PalettePieceType) => void;
  onRemovePieceFromStep: (stepId: string, piece: PalettePieceType) => void;
  // Drag & Drop
  isDragging: boolean;
  activeDragItem: DragItem | null;
  dragOverStepIndex: number | null;
  targetStepForPiece: string | null;
  onDragStartStack: (e: React.DragEvent, index: number) => void;
  onDragOverSlot: (e: React.DragEvent, index: number) => void;
  onDragLeaveSlot: () => void;
  onDropOnSlot: (index: number) => void;
  onDragOverStep: (e: React.DragEvent, stepId: string) => void;
  onDragLeaveStep: () => void;
  onDropOnStep: (stepId: string) => void;
  activeExecutingIndex: number;
}

export const PuzzleAssemblyColumn: React.FC<PuzzleAssemblyColumnProps> = ({
  steps,
  selectedStepId,
  onSelectStepId,
  onDeleteStep,
  onAddPieceToStep,
  onRemovePieceFromStep,
  isDragging,
  activeDragItem,
  dragOverStepIndex,
  targetStepForPiece,
  onDragStartStack,
  onDragOverSlot,
  onDragLeaveSlot,
  onDropOnSlot,
  onDragOverStep,
  onDragLeaveStep,
  onDropOnStep,
  activeExecutingIndex,
}) => {
  return (
    <div className="lg:col-span-5 p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-y-auto space-y-2 om-grid-pattern">
      {steps.length === 0 ? (
        <div
          onDragOver={(e) => onDragOverSlot(e, 0)}
          onDragLeave={onDragLeaveSlot}
          onDrop={() => onDropOnSlot(0)}
          className="p-8 rounded-2xl border-2 border-dashed border-white/20 text-center space-y-2 cursor-pointer"
        >
          <Layers className="w-8 h-8 mx-auto text-[var(--accent-base)] opacity-60" />
          <p className="text-xs font-bold text-white">Módulo sin pasos aún</p>
          <p className="text-[10px] text-[var(--text-dim)] font-mono">
            Arrastra el bloque "Paso de Trámite" aquí para comenzar
          </p>
        </div>
      ) : (
        steps.map((step, i) => (
          <React.Fragment key={step.id}>
            {/* Smooth Drop Slot for Steps */}
            {isDragging && activeDragItem?.type === 'step' && (
              <div
                onDragOver={(e) => onDragOverSlot(e, i)}
                onDragLeave={onDragLeaveSlot}
                onDrop={() => onDropOnSlot(i)}
                className={`transition-all duration-150 rounded-lg ${
                  dragOverStepIndex === i ? 'h-3 bg-cyan-400 shadow-[0_0_12px_#00e5ff]' : 'h-1'
                }`}
              />
            )}

            <PuzzleStepBlock
              step={step}
              index={i}
              isSelected={selectedStepId === step.id}
              isExecuting={activeExecutingIndex === i}
              isDropTarget={targetStepForPiece === step.id}
              onSelect={() => onSelectStepId(step.id)}
              onDeleteStep={() => onDeleteStep(i)}
              onAddPiece={(p) => onAddPieceToStep(step.id, p)}
              onRemovePiece={(p) => onRemovePieceFromStep(step.id, p)}
              onDragStart={(e) => onDragStartStack(e, i)}
              onDragOverStep={(e) => onDragOverStep(e, step.id)}
              onDragLeaveStep={onDragLeaveStep}
              onDropOnStep={() => onDropOnStep(step.id)}
            />
          </React.Fragment>
        ))
      )}

      {/* Trailing Drop Slot */}
      {isDragging && activeDragItem?.type === 'step' && steps.length > 0 && (
        <div
          onDragOver={(e) => onDragOverSlot(e, steps.length)}
          onDragLeave={onDragLeaveSlot}
          onDrop={() => onDropOnSlot(steps.length)}
          className={`transition-all duration-150 rounded-lg ${
            dragOverStepIndex === steps.length
              ? 'h-3 bg-cyan-400 shadow-[0_0_12px_#00e5ff]'
              : 'h-1'
          }`}
        />
      )}
    </div>
  );
};
