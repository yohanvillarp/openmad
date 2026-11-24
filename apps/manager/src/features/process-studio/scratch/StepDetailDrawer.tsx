import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import type { StepItem } from '../types';

interface StepDetailDrawerProps {
  step: StepItem | null;
  onUpdate: (step: StepItem) => void;
  onClose: () => void;
}

export const StepDetailDrawer: React.FC<StepDetailDrawerProps> = ({
  step,
  onUpdate,
  onClose,
}) => {
  const [tab, setTab] = useState<'general' | 'keys' | 'sections' | 'copyBox'>('general');

  if (!step) return null;

  const addKey = () => {
    const currentKeys = step.guide?.keys || [];
    const newKeys = [
      ...currentKeys,
      { code: String(currentKeys.length + 1), text: 'Nueva indicación secuencial' },
    ];
    onUpdate({
      ...step,
      guide: {
        heading: step.guide?.heading || 'En este orden',
        hint: step.guide?.hint,
        introAlert: step.guide?.introAlert,
        keys: newKeys,
        sections: step.guide?.sections,
        files: step.guide?.files,
        infoPanels: step.guide?.infoPanels,
      },
    });
  };

  const removeKey = (idx: number) => {
    if (!step.guide?.keys) return;
    const newKeys = step.guide.keys.filter((_, i) => i !== idx);
    onUpdate({ ...step, guide: { ...step.guide, keys: newKeys } });
  };

  const updateKeyText = (idx: number, text: string) => {
    if (!step.guide?.keys) return;
    const newKeys = step.guide.keys.map((k, i) => (i === idx ? { ...k, text } : k));
    onUpdate({ ...step, guide: { ...step.guide, keys: newKeys } });
  };

  const addSection = () => {
    const currentSections = step.guide?.sections || [];
    const newSections = [
      ...currentSections,
      { title: 'Nueva Sección de Auditoría', items: ['Verificar requisito del reglamento'] },
    ];
    onUpdate({
      ...step,
      guide: {
        heading: step.guide?.heading || 'En este orden',
        keys: step.guide?.keys || [],
        sections: newSections,
      },
    });
  };

  return (
    <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3 shadow-xl overflow-y-auto max-h-[420px]">
      <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-1">
          {(['general', 'keys', 'sections', 'copyBox'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono capitalize transition-colors ${
                tab === t
                  ? 'bg-[var(--accent-base)] text-black font-bold'
                  : 'text-[var(--text-dim)] hover:text-white hover:bg-white/5'
              }`}
            >
              {t === 'keys' ? 'Tareas (Keys)' : t === 'sections' ? 'Auditoría' : t === 'copyBox' ? 'Correo / Copy' : 'General'}
            </button>
          ))}
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded">
          <X className="w-3.5 h-3.5 text-[var(--text-dim)]" />
        </button>
      </div>

      {tab === 'general' && (
        <div className="space-y-2 text-xs">
          <div>
            <label className="text-[9px] font-mono text-[var(--text-dim)] block">Título del Paso</label>
            <input
              type="text"
              value={step.label}
              onChange={(e) => onUpdate({ ...step, label: e.target.value })}
              className="w-full bg-black/50 border border-white/20 rounded px-2 py-1 text-white text-xs"
            />
          </div>
          <div>
            <label className="text-[9px] font-mono text-[var(--text-dim)] block">Resumen Ejecutivo</label>
            <textarea
              value={step.summary}
              onChange={(e) => onUpdate({ ...step, summary: e.target.value })}
              rows={2}
              className="w-full bg-black/50 border border-white/20 rounded px-2 py-1 text-white text-xs"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[9px] font-mono text-[var(--text-dim)] block">Lugar / Ventanilla</label>
              <input
                type="text"
                value={step.location}
                onChange={(e) => onUpdate({ ...step, location: e.target.value })}
                className="w-full bg-black/50 border border-white/20 rounded px-2 py-1 text-white text-xs"
              />
            </div>
            <div>
              <label className="text-[9px] font-mono text-[var(--text-dim)] block">XP Otorgado</label>
              <input
                type="number"
                value={step.xpReward || 10}
                onChange={(e) => onUpdate({ ...step, xpReward: parseInt(e.target.value, 10) || 10 })}
                className="w-full bg-black/50 border border-white/20 rounded px-2 py-1 text-white text-xs font-mono"
              />
            </div>
          </div>
          {step.validity && (
            <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1.5">
              <span className="text-[9px] font-mono font-bold text-emerald-300 block">Autoridad de Validación</span>
              <input
                type="text"
                placeholder="Entidad o funcionario responsable"
                value={step.validity.authority}
                onChange={(e) => onUpdate({ ...step, validity: { ...step.validity!, authority: e.target.value } })}
                className="w-full bg-black/50 border border-white/20 rounded px-2 py-1 text-white text-xs"
              />
            </div>
          )}
        </div>
      )}

      {tab === 'keys' && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">
              Pasos Secuenciales "En este orden"
            </span>
            <button onClick={addKey} className="text-[9px] text-[var(--accent-base)] hover:underline flex items-center gap-0.5">
              <Plus className="w-2.5 h-2.5" /> Añadir tarea
            </button>
          </div>
          {step.guide?.keys?.map((k, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-slate-800 text-slate-300 text-[9px] flex items-center justify-center shrink-0 font-mono">
                {k.code}
              </span>
              <input
                type="text"
                value={k.text}
                onChange={(e) => updateKeyText(idx, e.target.value)}
                className="flex-1 bg-black/40 border border-white/10 rounded px-1.5 py-0.5 text-white text-[11px]"
              />
              <button onClick={() => removeKey(idx)} className="p-0.5 hover:text-rose-400 text-slate-500">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'sections' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">
              Auditoría y Checklist de Normas
            </span>
            <button onClick={addSection} className="text-[9px] text-[var(--accent-base)] hover:underline flex items-center gap-0.5">
              <Plus className="w-2.5 h-2.5" /> Añadir sección
            </button>
          </div>
          {step.guide?.sections?.map((sec, sIdx) => (
            <div key={sIdx} className="p-2 rounded bg-black/40 border border-white/10 space-y-1">
              <span className="font-bold text-white text-xs block">{sec.title}</span>
              <ul className="list-disc pl-4 text-[10px] text-slate-300 space-y-0.5">
                {sec.items.map((it, iIdx) => (
                  <li key={iIdx}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {tab === 'copyBox' && (
        <div className="space-y-2 text-xs">
          <span className="text-[9px] font-mono text-[var(--text-dim)] block">Plantilla de Solicitud / Correo</span>
          <textarea
            rows={5}
            placeholder="Pega la plantilla de correo o solicitud con {PLACEHOLDERS}..."
            value={step.guide?.keys?.find((k) => k.copyBox)?.copyBox?.content || ''}
            onChange={(e) => {
              const content = e.target.value;
              const currentKeys = step.guide?.keys || [{ code: '1', text: 'Enviar solicitud' }];
              const updatedKeys = currentKeys.map((k, idx) =>
                idx === 0 ? { ...k, copyBox: { id: `copy-${step.id}`, content } } : k
              );
              onUpdate({ ...step, guide: { ...step.guide, heading: step.guide?.heading || 'En este orden', keys: updatedKeys } });
            }}
            className="w-full bg-black/50 border border-white/20 rounded p-2 text-white text-[11px] font-mono leading-relaxed"
          />
        </div>
      )}
    </div>
  );
};
