import { useState, useEffect, useCallback } from 'react';
import type { PalettePieceType } from '../types';

export interface DragItem {
  source: 'palette' | 'stack';
  type?: PalettePieceType;
  index?: number;
}

export function useStepDragDrop() {
  const [isDragging, setIsDragging] = useState(false);
  const [activeDragItem, setActiveDragItem] = useState<DragItem | null>(null);
  const [dragOverStepIndex, setDragOverStepIndex] = useState<number | null>(null);
  const [targetStepForPiece, setTargetStepForPiece] = useState<string | null>(null);

  // Global cleanup on dragend anywhere on the window
  useEffect(() => {
    const handleGlobalDragEnd = () => {
      setIsDragging(false);
      setActiveDragItem(null);
      setDragOverStepIndex(null);
      setTargetStepForPiece(null);
    };

    window.addEventListener('dragend', handleGlobalDragEnd);
    window.addEventListener('mouseup', handleGlobalDragEnd);
    return () => {
      window.removeEventListener('dragend', handleGlobalDragEnd);
      window.removeEventListener('mouseup', handleGlobalDragEnd);
    };
  }, []);

  const startDragPalette = useCallback((e: React.DragEvent, type: PalettePieceType) => {
    setIsDragging(true);
    const item: DragItem = { source: 'palette', type };
    setActiveDragItem(item);
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'copy';
  }, []);

  const startDragStack = useCallback((e: React.DragEvent, index: number) => {
    setIsDragging(true);
    const item: DragItem = { source: 'stack', index };
    setActiveDragItem(item);
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const resetDragState = useCallback(() => {
    setIsDragging(false);
    setActiveDragItem(null);
    setDragOverStepIndex(null);
    setTargetStepForPiece(null);
  }, []);

  return {
    isDragging,
    activeDragItem,
    dragOverStepIndex,
    setDragOverStepIndex,
    targetStepForPiece,
    setTargetStepForPiece,
    startDragPalette,
    startDragStack,
    resetDragState,
  };
}
