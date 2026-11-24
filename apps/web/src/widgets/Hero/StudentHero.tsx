import React from 'react';
import { InteractiveMascot, useMascot } from '@/shared/ui/Mascot';
import { Badge } from '@/shared/ui/Badge';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import type { RouteDefinition } from '@/entities/route/types';

interface StudentHeroProps {
  route: RouteDefinition;
  selectedCareer: string;
  completedStepsCount: number;
  totalStepsCount: number;
}

export const StudentHero: React.FC<StudentHeroProps> = ({
  route,
  selectedCareer,
  completedStepsCount,
  totalStepsCount,
}) => {
  const currentCreditReq = route.minCredits.find((c) => c.career === selectedCareer);

  const percentage = totalStepsCount > 0 ? Math.round((completedStepsCount / totalStepsCount) * 100) : 0;

  const { mood, speech, onHoverMascot, onLeaveMascot, updateMood } = useMascot({
    dialogues: {
      happy: `¡Hola! Estás en la ruta de ${route.label}. Para ${selectedCareer}, necesitas ${currentCreditReq?.credits || 160} créditos aprobados.`,
      excited: `¡Excelente progreso! Llevas ${completedStepsCount} de ${totalStepsCount} pasos culminados. ¡Sigue así!`,
      thinking: 'Verificando los requisitos normativos del reglamento...',
    },
  });

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[var(--bg-surface)] via-[var(--bg-surface)] to-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] p-6 sm:p-8 shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent-base)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Information */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="success" size="md">
              <CheckCircle2 className="w-3 h-3" />
              Proceso Oficial Aprobado
            </Badge>
            <span className="text-xs text-[var(--text-dim)] font-mono">·</span>
            <span className="text-xs text-[var(--accent-base)] font-mono font-bold">
              {route.facultyLabel}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight om-font-display">
            {route.label}
          </h1>

          <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-2xl">
            {route.summary}
          </p>

          {/* Prerequisite and Requirement Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-dim)] font-mono font-bold uppercase">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Requisito de Créditos</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-white font-mono">
                  {currentCreditReq?.credits || 160}
                </span>
                <span className="text-xs text-[var(--text-muted)]">créditos aprobados mínimos</span>
              </div>
              {currentCreditReq?.note && (
                <p className="text-[11px] text-amber-300/80 leading-snug">{currentCreditReq.note}</p>
              )}
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-xs text-[var(--text-dim)] font-mono font-bold uppercase">
                <span>Tu Avance en la Ruta</span>
                <span className="text-cyan-400 font-bold">{percentage}%</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-white font-mono">
                  {completedStepsCount} / {totalStepsCount}
                </span>
                <span className="text-xs text-[var(--text-muted)]">pasos completados</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-black/60 overflow-hidden border border-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Madbot */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <InteractiveMascot
            mood={mood}
            speech={speech}
            size={140}
            onHover={onHoverMascot}
            onLeave={onLeaveMascot}
            onClick={() => updateMood('excited', '¡Hoola! Puedes marcar tus tareas para sumar XP.')}
          />
        </div>
      </div>
    </section>
  );
};
