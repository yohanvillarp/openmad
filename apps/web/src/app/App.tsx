import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Navbar, type ActivePanel } from '@/widgets/Navigation/Navbar';
import { StudentHero } from '@/widgets/Hero/StudentHero';
import { ModuleTabs } from '@/widgets/ProcessExplorer/ModuleTabs';
import { StepCardList } from '@/widgets/ProcessExplorer/StepCardList';
import { StepDetailDrawer } from '@/widgets/ProcessExplorer/StepDetailDrawer';
import { APPROVED_PRACTICAS_ROUTE } from '@/entities/route/mockApprovedRoutes';
import type { StepItem } from '@/entities/route/types';
import { GitPullRequest, Bot, BookOpen } from 'lucide-react';

export default function App() {
  const [activePanel, setActivePanel] = useState<ActivePanel>('routes');
  const [selectedCareer, setSelectedCareer] = useState<string>(
    APPROVED_PRACTICAS_ROUTE.minCredits[0]?.career || 'Ingeniería de Sistemas e Informática'
  );

  const [activeModuleId, setActiveModuleId] = useState<string>(
    APPROVED_PRACTICAS_ROUTE.modules[0]?.id || ''
  );

  const [completedStepIds, setCompletedStepIds] = useState<Set<string>>(
    new Set(['carta-solicitud'])
  );

  const [selectedStep, setSelectedStep] = useState<StepItem | null>(null);

  const careers = APPROVED_PRACTICAS_ROUTE.minCredits.map((c) => c.career);
  const activeModule =
    APPROVED_PRACTICAS_ROUTE.modules.find((m) => m.id === activeModuleId) ||
    APPROVED_PRACTICAS_ROUTE.modules[0];

  const totalStepsInRoute = APPROVED_PRACTICAS_ROUTE.modules.reduce(
    (acc, m) => acc + m.steps.length,
    0
  );

  const totalXp = Array.from(completedStepIds).reduce((acc, stepId) => {
    let xp = 10;
    for (const m of APPROVED_PRACTICAS_ROUTE.modules) {
      const found = m.steps.find((s) => s.id === stepId);
      if (found?.xpReward) xp = found.xpReward;
    }
    return acc + xp;
  }, 0);

  const handleToggleStep = (step: StepItem) => {
    const next = new Set(completedStepIds);
    if (next.has(step.id)) {
      next.delete(step.id);
    } else {
      next.add(step.id);
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.7 } });
    }
    setCompletedStepIds(next);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-main)] flex flex-col selection:bg-[var(--accent-base)] selection:text-black">
      {/* Navbar */}
      <Navbar
        activePanel={activePanel}
        onChangePanel={setActivePanel}
        selectedCareer={selectedCareer}
        onSelectCareer={setSelectedCareer}
        careers={careers}
        totalXp={totalXp}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {activePanel === 'routes' ? (
          <>
            {/* Panel 1: Hero with Madbot */}
            <StudentHero
              route={APPROVED_PRACTICAS_ROUTE}
              selectedCareer={selectedCareer}
              completedStepsCount={completedStepIds.size}
              totalStepsCount={totalStepsInRoute}
            />

            {/* Explorer Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[var(--accent-base)]" />
                  <h2 className="text-lg font-black text-white om-font-display">
                    Etapas del Procedimiento
                  </h2>
                </div>
                <span className="text-xs text-[var(--text-dim)] font-mono">
                  {activeModule.steps.length} pasos en esta etapa
                </span>
              </div>

              {/* Module Ribbon */}
              <ModuleTabs
                modules={APPROVED_PRACTICAS_ROUTE.modules}
                activeModuleId={activeModule.id}
                onSelectModule={setActiveModuleId}
                completedStepIds={completedStepIds}
              />

              {/* Steps List */}
              <StepCardList
                steps={activeModule.steps}
                completedStepIds={completedStepIds}
                onToggleStep={handleToggleStep}
                onOpenStepDetail={setSelectedStep}
              />
            </div>
          </>
        ) : activePanel === 'propose' ? (
          /* Panel 2 Placeholder */
          <div className="p-12 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center space-y-4 max-w-xl mx-auto my-12 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-[var(--accent-base)]">
              <GitPullRequest className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white">Panel 2: Aportar Nueva Ruta o Paso</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Aquí los estudiantes podrán proponer modificaciones, nuevos aranceles o trámites.
              <strong> Madbot examinará la propuesta</strong> identificando irregularidades normativas
              antes de aprobarla para toda la comunidad.
            </p>
            <button
              onClick={() => setActivePanel('routes')}
              className="text-xs text-[var(--accent-base)] font-bold hover:underline font-mono"
            >
              ← Volver al Panel Principal de Rutas
            </button>
          </div>
        ) : (
          /* Panel 3 Placeholder */
          <div className="p-12 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center space-y-4 max-w-xl mx-auto my-12 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400">
              <Bot className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white">Panel 3: MadBot Evaluador & Chatbot</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Basado en el conocimiento de <code>plans/01-REVISIONES.md</code>: sube tu borrador de informe
              en PDF/DOCX y Madbot realizará un diagnóstico preventivo de coherencia (240 horas, correlación
              de objetivos con conclusiones y documentos de sustento).
            </p>
            <button
              onClick={() => setActivePanel('routes')}
              className="text-xs text-[var(--accent-base)] font-bold hover:underline font-mono"
            >
              ← Volver al Panel Principal de Rutas
            </button>
          </div>
        )}
      </main>

      {/* Step Detail Modal */}
      <StepDetailDrawer
        step={selectedStep}
        onClose={() => setSelectedStep(null)}
        isDone={selectedStep ? completedStepIds.has(selectedStep.id) : false}
        onToggleDone={() => {
          if (selectedStep) handleToggleStep(selectedStep);
        }}
      />
    </div>
  );
}
