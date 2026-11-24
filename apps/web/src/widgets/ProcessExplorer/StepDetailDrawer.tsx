import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  Download,
  AlertTriangle,
  MapPin,
  CheckSquare,
} from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import type { StepItem } from '@/entities/route/types';

interface StepDetailDrawerProps {
  step: StepItem | null;
  onClose: () => void;
  isDone: boolean;
  onToggleDone: () => void;
}

export const StepDetailDrawer: React.FC<StepDetailDrawerProps> = ({
  step,
  onClose,
  isDone,
  onToggleDone,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!step) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl max-h-[85vh] rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[var(--border-subtle)] flex items-start justify-between gap-4 bg-[var(--bg-surface-elevated)]">
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase text-[var(--accent-base)] bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-500/30">
                Detalle del Trámite
              </span>
              <div className="flex items-center gap-1 text-[10px] font-mono text-[var(--text-dim)]">
                <MapPin className="w-3 h-3 text-cyan-400" />
                <span>{step.location}</span>
              </div>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white om-font-display">
              {step.label}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            {step.summary}
          </p>

          {/* Drive & Downloads Action Card */}
          {step.drive && (
            <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase text-purple-300 font-bold block">
                  Documento Oficial Editable
                </span>
                <span className="font-bold text-white text-xs truncate block">
                  {step.drive.title}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {step.drive.downloadUrl && (
                  <a
                    href={step.drive.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1.5 transition-colors text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar DOCX</span>
                  </a>
                )}
                <a
                  href={step.drive.driveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-1.5 transition-colors text-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Abrir en Drive</span>
                </a>
              </div>
            </div>
          )}

          {/* Alert Message */}
          {step.guide?.introAlert && (
            <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-200 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed font-medium">{step.guide.introAlert}</p>
            </div>
          )}

          {/* Sequential Keys Checklist */}
          {step.guide?.keys && step.guide.keys.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase text-[var(--text-dim)] block">
                {step.guide.heading || 'En este orden'}
              </span>
              <div className="space-y-2">
                {step.guide.keys.map((k) => (
                  <div key={k.code} className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-lg bg-slate-800 text-slate-200 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-slate-600">
                        {k.code}
                      </span>
                      <p className="text-slate-200 text-xs leading-relaxed pt-0.5">{k.text}</p>
                    </div>

                    {/* Sub-items */}
                    {k.items && k.items.length > 0 && (
                      <ul className="list-disc pl-8 text-[11px] text-slate-400 space-y-0.5">
                        {k.items.map((it, idx) => (
                          <li key={idx}>{it}</li>
                        ))}
                      </ul>
                    )}

                    {/* 1-Click Copy Box */}
                    {k.copyBox && (
                      <div className="mt-2 p-3 rounded-xl bg-black/70 border border-cyan-500/30 space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300 font-bold">
                          <span>Texto sugerido para el correo:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(k.copyBox!.id, k.copyBox!.content)}
                            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-200 cursor-pointer transition-colors"
                          >
                            {copiedId === k.copyBox.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span>¡Copiado al portapapeles!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copiar mensaje</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="text-[11px] font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
                          {k.copyBox.content}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Close Warning / Tip */}
          {step.guide?.close && (
            <p className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-cyan-300/90 text-xs leading-relaxed">
              {step.guide.close}
            </p>
          )}
        </div>

        {/* Footer with Complete Toggle */}
        <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-between">
          <div className="text-xs text-[var(--text-dim)] font-mono">
            Recompensa: <strong className="text-amber-400">+{step.xpReward || 10} XP</strong>
          </div>
          <Button
            variant={isDone ? 'secondary' : 'accent'}
            onClick={onToggleDone}
            icon={<CheckSquare className="w-4 h-4" />}
          >
            {isDone ? 'Marcar como Pendiente' : 'Marcar como Completado (+XP)'}
          </Button>
        </div>
      </div>
    </div>
  );
};
