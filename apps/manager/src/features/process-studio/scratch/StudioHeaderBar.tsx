import React from 'react';
import { ArrowLeftRight, Code, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import type { RouteDefinition, ModuleDefinition } from '../types';

interface StudioHeaderBarProps {
  route: RouteDefinition;
  activeModule: ModuleDefinition;
  onSelectModule: (id: string) => void;
  onReturnToCircuit: () => void;
  showCode: boolean;
  onToggleCode: () => void;
  showDetailDrawer: boolean;
  onToggleDetailDrawer: () => void;
}

export const StudioHeaderBar: React.FC<StudioHeaderBarProps> = ({
  route,
  activeModule,
  onSelectModule,
  onReturnToCircuit,
  showCode,
  onToggleCode,
  showDetailDrawer,
  onToggleDetailDrawer,
}) => {
  return (
    <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl shrink-0">
      <div className="flex items-center gap-2">
        <button
          onClick={onReturnToCircuit}
          className="text-xs font-mono font-bold text-[var(--accent-base)] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Red Macro</span>
        </button>
        <span className="text-xs text-[var(--text-dim)]">/</span>
        
        {/* Module Selector Ribbon */}
        <div className="flex items-center gap-1 flex-wrap">
          {route.modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeModule.id === mod.id
                  ? 'bg-[var(--accent-base)] text-[var(--accent-contrast)] shadow-sm'
                  : 'text-[var(--text-dim)] hover:text-white bg-black/30'
              }`}
            >
              {mod.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="secondary"
          size="sm"
          onClick={onToggleDetailDrawer}
          icon={<SlidersHorizontal className="w-3.5 h-3.5" />}
        >
          {showDetailDrawer ? 'Cerrar Panel' : 'Propiedades'}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onToggleCode}
          icon={<Code className="w-3.5 h-3.5" />}
        >
          {showCode ? 'Bloques' : 'JSON'}
        </Button>
      </div>
    </div>
  );
};
