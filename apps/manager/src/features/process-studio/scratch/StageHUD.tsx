import React, { useState } from 'react';
import { Flag, Square, MapPin, Award, CheckCircle } from 'lucide-react';
import { Mascot } from '@/shared/ui/Mascot';
import type { StepItem, CreditRequirement } from '../types';

interface StageHUDProps {
  isRunning: boolean;
  activeStep: StepItem | null;
  activeStepIndex: number;
  totalSteps: number;
  onStart: () => void;
  onStop: () => void;
  log: string[];
  careerCredits?: CreditRequirement[];
}

export const StageHUD: React.FC<StageHUDProps> = ({
  isRunning,
  activeStep,
  activeStepIndex,
  totalSteps,
  onStart,
  onStop,
  log,
  careerCredits = [],
}) => {
  const [selectedCareer, setSelectedCareer] = useState<string>(
    careerCredits[0]?.career || 'Ingeniería de Sistemas e Informática'
  );

  const currentCareerReq = careerCredits.find((c) => c.career === selectedCareer);
  const earnedXp = Math.max(0, activeStepIndex) * 10;

  return (
    <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3 shadow-xl">
      {/* Top Bar: Green Flag / Stop + XP */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-1.5">
          <button
            onClick={onStart}
            disabled={isRunning || totalSteps === 0}
            className={`px-3 py-1 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all shadow-md ${
              isRunning
                ? 'bg-emerald-600/40 text-emerald-200 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-400 text-black active:scale-95 shadow-emerald-500/30'
            }`}
          >
            <Flag className="w-3.5 h-3.5 fill-current" />
            <span>Simulador 🚩</span>
          </button>

          <button
            onClick={onStop}
            disabled={!isRunning}
            className={`p-1.5 rounded-xl transition-all ${
              isRunning
                ? 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/30 active:scale-95'
                : 'bg-[var(--bg-surface-elevated)] text-[var(--text-dim)] cursor-not-allowed opacity-40'
            }`}
            title="Detener"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
            <Award className="w-3 h-3 text-amber-400" />
            <strong>{earnedXp} XP</strong>
          </span>
          <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-400 animate-ping' : 'bg-white/20'}`} />
        </div>
      </div>

      {/* Career Selection & Requirements */}
      {careerCredits.length > 0 && (
        <div className="p-2 rounded-xl bg-black/40 border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-[var(--text-dim)] font-bold">Carrera Estudiante:</span>
            <span className="text-cyan-400 font-bold">
              {currentCareerReq ? `${currentCareerReq.credits} cr necesarios` : ''}
            </span>
          </div>
          <select
            value={selectedCareer}
            onChange={(e) => setSelectedCareer(e.target.value)}
            className="w-full bg-black/60 border border-white/20 rounded px-2 py-1 text-white text-xs"
          >
            {careerCredits.map((c) => (
              <option key={c.career} value={c.career}>
                {c.career} ({c.credits} cr)
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Campus Simulator Screen */}
      <div className="relative rounded-xl bg-gradient-to-b from-[#0a1220] to-[#040810] border border-cyan-500/20 p-3 min-h-[175px] flex flex-col justify-between overflow-hidden shadow-inner">
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono">
          <span className="text-cyan-300 font-bold flex items-center gap-1">
            <MapPin className="w-3 h-3 text-cyan-400" />
            {activeStep ? activeStep.location : 'Campus UNAMAD'}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-200 border border-cyan-500/30">
            {activeStep ? `Paso ${activeStepIndex + 1} de ${totalSteps}` : 'Listo'}
          </span>
        </div>

        {/* Mascot & Speech */}
        <div className="relative z-10 flex flex-col items-center justify-center my-1.5 space-y-1">
          <div className="max-w-[240px] p-2 rounded-xl bg-white text-slate-900 shadow-xl text-[11px] leading-snug font-medium text-center truncate">
            {isRunning && activeStep
              ? activeStep.label
              : activeStepIndex >= totalSteps && totalSteps > 0
              ? '¡Excelente! Has culminado todos los pasos de este módulo'
              : 'Presiona el Simulador para probar la ruta'}
          </div>
          <Mascot mood={isRunning ? 'excited' : activeStepIndex >= totalSteps && totalSteps > 0 ? 'happy' : 'thinking'} size={75} />
        </div>

        {/* Mini progress bar */}
        <div className="relative z-10">
          <div className="h-1.5 w-full rounded-full bg-black/60 overflow-hidden border border-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
              style={{
                width: `${
                  totalSteps === 0
                    ? 0
                    : ((Math.max(0, activeStepIndex) + 1) / totalSteps) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Real-time Log */}
      <div className="p-2 rounded-xl bg-black/60 border border-[var(--border-subtle)] font-mono text-[9px] text-[var(--text-dim)] max-h-20 overflow-y-auto space-y-0.5">
        {log.length === 0 ? (
          <span className="italic opacity-50">Esperando ejecución interactiva...</span>
        ) : (
          log.map((entry, i) => (
            <div
              key={i}
              className={
                entry.includes('COMPLETA')
                  ? 'text-emerald-400 font-bold flex items-center gap-1'
                  : entry.includes('BANDERA')
                  ? 'text-yellow-300 font-bold'
                  : 'text-slate-300'
              }
            >
              {entry.includes('COMPLETA') && <CheckCircle className="w-2.5 h-2.5 text-emerald-400 shrink-0" />}
              <span>{entry}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
