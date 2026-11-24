import React from 'react';
import type { ModuleDefinition } from '@/entities/route/types';

interface ModuleTabsProps {
  modules: ModuleDefinition[];
  activeModuleId: string;
  onSelectModule: (id: string) => void;
  completedStepIds: Set<string>;
}

export const ModuleTabs: React.FC<ModuleTabsProps> = ({
  modules,
  activeModuleId,
  onSelectModule,
  completedStepIds,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[var(--border-subtle)]">
      {modules.map((mod, index) => {
        const isActive = mod.id === activeModuleId;
        const total = mod.steps.length;
        const done = mod.steps.filter((s) => completedStepIds.has(s.id)).length;
        const isComplete = total > 0 && done === total;

        return (
          <button
            key={mod.id}
            type="button"
            onClick={() => onSelectModule(mod.id)}
            className={`px-4 py-3 rounded-2xl border transition-all text-left cursor-pointer shrink-0 flex items-center gap-3 ${
              isActive
                ? 'bg-[var(--bg-surface-elevated)] border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.15)] ring-1 ring-cyan-400/40'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--border-hover)]'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-bold ${
                isComplete
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-white/5 text-[var(--text-dim)]'
              }`}
            >
              {isComplete ? '✓' : index + 1}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold block ${isActive ? 'text-white' : 'text-[var(--text-muted)]'}`}>
                  {mod.label}
                </span>
                <span className="text-[10px] font-mono text-[var(--text-dim)]">
                  ({done}/{total})
                </span>
              </div>
              <p className="text-[10px] text-[var(--text-dim)] truncate max-w-[220px]">
                {mod.summary}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
