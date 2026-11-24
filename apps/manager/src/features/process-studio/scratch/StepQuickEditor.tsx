import React from 'react';
import type { StepItem } from '../types';

interface StepQuickEditorProps {
  step: StepItem | null;
  onUpdate: (updated: StepItem) => void;
}

export const StepQuickEditor: React.FC<StepQuickEditorProps> = ({ step, onUpdate }) => {
  if (!step) return null;

  return (
    <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2.5 shadow-xl">
      <span className="text-[10px] font-mono font-bold text-[var(--text-dim)] uppercase block">
        Editar Paso Seleccionado
      </span>

      <div>
        <label className="text-[10px] font-mono text-[var(--text-dim)] block">
          Nombre del Trámite
        </label>
        <input
          type="text"
          value={step.label}
          onChange={(e) => onUpdate({ ...step, label: e.target.value })}
          className="w-full bg-black/50 border border-white/20 rounded-lg px-2.5 py-1 text-xs text-white"
        />
      </div>

      <div>
        <label className="text-[10px] font-mono text-[var(--text-dim)] block">
          Resumen
        </label>
        <textarea
          value={step.summary}
          onChange={(e) => onUpdate({ ...step, summary: e.target.value })}
          rows={2}
          className="w-full bg-black/50 border border-white/20 rounded-lg px-2.5 py-1 text-xs text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] font-mono text-[var(--text-dim)] block">
            Oficina / Lugar
          </label>
          <input
            type="text"
            value={step.location}
            onChange={(e) => onUpdate({ ...step, location: e.target.value })}
            className="w-full bg-black/50 border border-white/20 rounded-lg px-2.5 py-1 text-xs text-white"
          />
        </div>

        {step.validity && (
          <div>
            <label className="text-[10px] font-mono text-[var(--text-dim)] block">
              Autoridad / Firma
            </label>
            <input
              type="text"
              value={step.validity.authority}
              onChange={(e) =>
                onUpdate({
                  ...step,
                  validity: { required: true, authority: e.target.value },
                })
              }
              className="w-full bg-black/50 border border-white/20 rounded-lg px-2.5 py-1 text-xs text-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};
