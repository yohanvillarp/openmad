import React from 'react';
import {
  CheckCircle,
  Circle,
  FileText,
  DollarSign,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  MapPin,
  Award,
} from 'lucide-react';
import type { StepItem } from '@/entities/route/types';

interface StepCardListProps {
  steps: StepItem[];
  completedStepIds: Set<string>;
  onToggleStep: (step: StepItem) => void;
  onOpenStepDetail: (step: StepItem) => void;
}

export const StepCardList: React.FC<StepCardListProps> = ({
  steps,
  completedStepIds,
  onToggleStep,
  onOpenStepDetail,
}) => {
  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        const isDone = completedStepIds.has(step.id);

        return (
          <div
            key={step.id}
            onClick={() => onOpenStepDetail(step)}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none group relative overflow-hidden ${
              isDone
                ? 'bg-[#091515] border-emerald-500/30 hover:border-emerald-500/60'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-cyan-500/40 hover:bg-[var(--bg-surface-elevated)]'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              {/* Left: Step Info */}
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                {/* Complete Checkbox Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStep(step);
                  }}
                  className={`mt-0.5 p-1 rounded-xl transition-all cursor-pointer shrink-0 ${
                    isDone
                      ? 'text-emerald-400 bg-emerald-950/60 hover:scale-110'
                      : 'text-slate-500 hover:text-cyan-400 hover:scale-110'
                  }`}
                  title={isDone ? 'Marcar como pendiente' : 'Marcar como completado'}
                >
                  {isDone ? (
                    <CheckCircle className="w-5 h-5 fill-emerald-500/20" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold uppercase text-[var(--accent-base)] bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/30">
                      Paso {index + 1}
                    </span>
                    <h3
                      className={`text-sm sm:text-base font-bold truncate ${
                        isDone ? 'line-through text-slate-400' : 'text-white'
                      }`}
                    >
                      {step.label}
                    </h3>
                  </div>

                  <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                    {step.summary}
                  </p>

                  {/* Sub-Pills */}
                  <div className="flex items-center gap-2 pt-1.5 flex-wrap">
                    <div className="flex items-center gap-1 text-[10px] font-mono text-[var(--text-dim)] bg-black/40 px-2 py-0.5 rounded-full">
                      <MapPin className="w-3 h-3 opacity-70" />
                      <span>{step.location}</span>
                    </div>

                    {step.cost && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-orange-300 bg-orange-950/50 border border-orange-500/30 px-2 py-0.5 rounded-full">
                        <DollarSign className="w-3 h-3 text-orange-400" />
                        <span>{step.cost.amount}</span>
                      </span>
                    )}

                    {step.drive && (
                      <a
                        href={step.drive.driveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-[10px] font-mono text-purple-300 bg-purple-950/50 border border-purple-500/30 px-2 py-0.5 rounded-full hover:bg-purple-900/60"
                      >
                        <FileText className="w-3 h-3 text-purple-400" />
                        <span>Formato Drive</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}

                    {step.validity && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>{step.validity.authority}</span>
                      </span>
                    )}

                    <span className="flex items-center gap-1 text-[10px] font-mono text-amber-300/80 bg-amber-500/10 px-2 py-0.5 rounded-full">
                      <Award className="w-3 h-3 text-amber-400" />
                      <span>+{step.xpReward || 10} XP</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Action Chevron */}
              <div className="flex items-center text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0 mt-2">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
