import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import type { RouteDefinition, StepItem, PalettePieceType } from '../types';
import { PaletteBlocks } from './PaletteBlocks';
import { StudioHeaderBar } from './StudioHeaderBar';
import { PuzzleAssemblyColumn } from './PuzzleAssemblyColumn';
import { StageHUD } from './StageHUD';
import { StepQuickEditor } from './StepQuickEditor';
import { StepDetailDrawer } from './StepDetailDrawer';
import { SubPieceToggles } from './SubPieceToggles';
import { useStepDragDrop } from './useStepDragDrop';
import { attachPieceToStep, removePieceFromStep } from './stepPieceMutations';

interface ScratchStudioProps {
  route: RouteDefinition;
  onRouteChange: (updated: RouteDefinition) => void;
  onReturnToCircuit: () => void;
}

export const ScratchStudio: React.FC<ScratchStudioProps> = ({
  route,
  onRouteChange,
  onReturnToCircuit,
}) => {
  const [activeModuleId, setActiveModuleId] = useState<string>(route.modules[0]?.id || '');
  const activeModule = route.modules.find((m) => m.id === activeModuleId) || route.modules[0];
  const steps = useMemo(() => activeModule?.steps || [], [activeModule]);

  const [selectedStepId, setSelectedStepId] = useState<string>(steps[0]?.id || '');
  const [showCode, setShowCode] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);

  // Execution Simulator
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [log, setLog] = useState<string[]>([]);

  const {
    isDragging,
    activeDragItem,
    dragOverStepIndex,
    setDragOverStepIndex,
    targetStepForPiece,
    setTargetStepForPiece,
    startDragPalette,
    startDragStack,
    resetDragState,
  } = useStepDragDrop();

  const selectedStep = steps.find((s) => s.id === selectedStepId) || steps[0] || null;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isRunning) {
      if (activeStepIndex < steps.length - 1) {
        timer = setTimeout(() => {
          const next = activeStepIndex + 1;
          setActiveStepIndex(next);
          const cur = steps[next];
          setLog((prev) => [...prev, `Paso ${next + 1}: ${cur.label} (${cur.location})`]);
        }, 1200);
      } else {
        timer = setTimeout(() => {
          setIsRunning(false);
          confetti({ particleCount: 110, spread: 75, origin: { y: 0.6 } });
          setLog((prev) => [...prev, '★ MÓDULO VERIFICADO CON ÉXITO (+50 XP).']);
        }, 0);
      }
    }
    return () => clearTimeout(timer);
  }, [isRunning, activeStepIndex, steps]);

  const updateModuleSteps = (newSteps: StepItem[]) => {
    onRouteChange({
      ...route,
      modules: route.modules.map((m) =>
        m.id === activeModule.id ? { ...m, steps: newSteps } : m
      ),
    });
  };

  const handleDropOnSlot = (slotIndex: number) => {
    if (!activeDragItem) return;
    if (activeDragItem.source === 'palette' && activeDragItem.type === 'step') {
      const newStep: StepItem = {
        id: `paso-${Date.now()}`,
        label: `Paso ${steps.length + 1}: Nuevo Paso`,
        summary: 'Indicación del trámite a realizar.',
        location: 'Facultad UNAMAD',
        xpReward: 10,
      };
      const updated = [...steps];
      updated.splice(slotIndex, 0, newStep);
      updateModuleSteps(updated);
      setSelectedStepId(newStep.id);
    } else if (activeDragItem.source === 'stack' && typeof activeDragItem.index === 'number') {
      const from = activeDragItem.index;
      if (from !== slotIndex && from + 1 !== slotIndex) {
        const updated = [...steps];
        const [moved] = updated.splice(from, 1);
        const target = from < slotIndex ? slotIndex - 1 : slotIndex;
        updated.splice(target, 0, moved);
        updateModuleSteps(updated);
      }
    }
    resetDragState();
  };

  const handleAttachPiece = (stepId: string, type: PalettePieceType) => {
    const updated = steps.map((s) => (s.id === stepId ? attachPieceToStep(s, type) : s));
    updateModuleSteps(updated);
  };

  const handleRemovePiece = (stepId: string, piece: PalettePieceType) => {
    const updated = steps.map((s) => (s.id === stepId ? removePieceFromStep(s, piece) : s));
    updateModuleSteps(updated);
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col space-y-2">
      <StudioHeaderBar
        route={route}
        activeModule={activeModule}
        onSelectModule={(id) => {
          setActiveModuleId(id);
          const m = route.modules.find((x) => x.id === id);
          setSelectedStepId(m?.steps[0]?.id || '');
        }}
        onReturnToCircuit={onReturnToCircuit}
        showCode={showCode}
        onToggleCode={() => setShowCode(!showCode)}
        showDetailDrawer={showDetailDrawer}
        onToggleDetailDrawer={() => setShowDetailDrawer(!showDetailDrawer)}
      />

      {showCode ? (
        <div className="flex-1 p-4 rounded-xl bg-black/90 border border-white/10 overflow-auto font-mono text-xs text-cyan-300">
          <pre>{JSON.stringify(activeModule, null, 2)}</pre>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 overflow-hidden">
          {/* Col 1: Palette */}
          <div className="lg:col-span-3 p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-y-auto">
            <PaletteBlocks
              onAddBlock={(t) => {
                if (t === 'step') {
                  const newStep: StepItem = {
                    id: `paso-${Date.now()}`,
                    label: `Paso ${steps.length + 1}: Nuevo Paso`,
                    summary: 'Indicación.',
                    location: 'Facultad UNAMAD',
                    xpReward: 10,
                  };
                  updateModuleSteps([...steps, newStep]);
                  setSelectedStepId(newStep.id);
                } else if (selectedStep) {
                  handleAttachPiece(selectedStep.id, t);
                }
              }}
              onDragStartFromPalette={(e, t) => startDragPalette(e, t)}
            />
          </div>

          {/* Col 2: Assembly Column */}
          <PuzzleAssemblyColumn
            steps={steps}
            selectedStepId={selectedStepId}
            onSelectStepId={setSelectedStepId}
            onDeleteStep={(idx) => {
              const updated = steps.filter((_, i) => i !== idx);
              updateModuleSteps(updated);
              if (selectedStepId === steps[idx]?.id) setSelectedStepId(updated[0]?.id || '');
            }}
            onAddPieceToStep={handleAttachPiece}
            onRemovePieceFromStep={handleRemovePiece}
            isDragging={isDragging}
            activeDragItem={activeDragItem}
            dragOverStepIndex={dragOverStepIndex}
            targetStepForPiece={targetStepForPiece}
            onDragStartStack={startDragStack}
            onDragOverSlot={(e, idx) => { e.preventDefault(); setDragOverStepIndex(idx); }}
            onDragLeaveSlot={() => setDragOverStepIndex(null)}
            onDropOnSlot={handleDropOnSlot}
            onDragOverStep={(e, id) => {
              if (activeDragItem?.source === 'palette' && activeDragItem.type !== 'step') {
                e.preventDefault();
                setTargetStepForPiece(id);
              }
            }}
            onDragLeaveStep={() => setTargetStepForPiece(null)}
            onDropOnStep={(id) => {
              if (activeDragItem?.source === 'palette' && activeDragItem.type && activeDragItem.type !== 'step') {
                handleAttachPiece(id, activeDragItem.type);
              }
              resetDragState();
            }}
            activeExecutingIndex={activeStepIndex}
          />

          {/* Col 3: Inspector / HUD */}
          <div className="lg:col-span-4 p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-y-auto space-y-3">
            <StageHUD
              isRunning={isRunning}
              activeStep={activeStepIndex >= 0 ? steps[activeStepIndex] : selectedStep}
              activeStepIndex={activeStepIndex >= 0 ? activeStepIndex : steps.findIndex((s) => s.id === selectedStepId)}
              totalSteps={steps.length}
              careerCredits={route.minCredits}
              onStart={() => { setActiveStepIndex(-1); setLog(['🚩 INICIANDO SIMULACIÓN DE RUTA...']); setIsRunning(true); }}
              onStop={() => { setIsRunning(false); setLog((p) => [...p, '🛑 SIMULACIÓN PAUSADA.']); }}
              log={log}
            />

            {showDetailDrawer ? (
              <StepDetailDrawer
                step={selectedStep}
                onUpdate={(up) => updateModuleSteps(steps.map((s) => (s.id === up.id ? up : s)))}
                onClose={() => setShowDetailDrawer(false)}
              />
            ) : (
              <>
                <SubPieceToggles
                  step={selectedStep}
                  onTogglePiece={(type) => {
                    if (!selectedStep) return;
                    const hasIt =
                      (type === 'cost' && selectedStep.cost) ||
                      (type === 'drive' && selectedStep.drive) ||
                      (type === 'validity' && selectedStep.validity) ||
                      (type === 'alert' && selectedStep.guide?.introAlert) ||
                      (type === 'copyBox' && selectedStep.guide?.keys?.some((k) => k.copyBox)) ||
                      (type === 'checklist' && selectedStep.guide?.sections?.length) ||
                      (type === 'infoPanel' && selectedStep.guide?.infoPanels?.length) ||
                      (type === 'attachment' && selectedStep.guide?.files?.length);
                    if (hasIt) handleRemovePiece(selectedStep.id, type);
                    else handleAttachPiece(selectedStep.id, type);
                  }}
                />
                <StepQuickEditor
                  step={selectedStep}
                  onUpdate={(up) => updateModuleSteps(steps.map((s) => (s.id === up.id ? up : s)))}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
