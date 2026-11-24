import React from 'react';
import { Compass, GitPullRequest, Bot, Award, GraduationCap } from 'lucide-react';
import { Badge } from '@/shared/ui/Badge';

export type ActivePanel = 'routes' | 'propose' | 'madbot';

interface NavbarProps {
  activePanel: ActivePanel;
  onChangePanel: (panel: ActivePanel) => void;
  selectedCareer: string;
  onSelectCareer: (career: string) => void;
  careers: string[];
  totalXp: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePanel,
  onChangePanel,
  selectedCareer,
  onSelectCareer,
  careers,
  totalXp,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-app)]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--accent-base)] to-cyan-300 flex items-center justify-center shadow-[0_0_15px_var(--accent-glow)]">
            <span className="text-black font-black text-lg">M</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm tracking-tight text-white font-mono">OpenMad</span>
              <Badge variant="accent" size="sm">UNAMAD</Badge>
            </div>
            <span className="text-[10px] text-[var(--text-dim)] font-mono block">Rutas Académicas & Trámites</span>
          </div>
        </div>

        {/* 3 Main Panels Selector */}
        <nav className="hidden md:flex items-center gap-1 bg-[var(--bg-surface)] p-1 rounded-xl border border-[var(--border-subtle)]">
          <button
            type="button"
            onClick={() => onChangePanel('routes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activePanel === 'routes'
                ? 'bg-[var(--accent-base)] text-[var(--accent-contrast)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>1. Rutas Aprobadas</span>
          </button>

          <button
            type="button"
            onClick={() => onChangePanel('propose')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activePanel === 'propose'
                ? 'bg-[var(--accent-base)] text-[var(--accent-contrast)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-white'
            }`}
          >
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>2. Aportar Ruta</span>
            <span className="text-[9px] bg-white/10 px-1.5 py-0.2 rounded font-mono text-[var(--text-dim)]">Próx</span>
          </button>

          <button
            type="button"
            onClick={() => onChangePanel('madbot')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activePanel === 'madbot'
                ? 'bg-[var(--accent-base)] text-[var(--accent-contrast)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>3. MadBot Diagnóstico</span>
            <span className="text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.2 rounded font-mono">IA</span>
          </button>
        </nav>

        {/* Right Tools: Career Selection & XP */}
        <div className="flex items-center gap-3">
          {/* Career dropdown */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] px-2.5 py-1.5 rounded-xl">
            <GraduationCap className="w-3.5 h-3.5 text-[var(--accent-base)]" />
            <select
              value={selectedCareer}
              onChange={(e) => onSelectCareer(e.target.value)}
              className="bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer max-w-[170px] truncate"
            >
              {careers.map((career) => (
                <option key={career} value={career} className="bg-[var(--bg-surface-elevated)] text-white">
                  {career}
                </option>
              ))}
            </select>
          </div>

          {/* XP Gauge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs shadow-sm">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-bold">{totalXp} XP</span>
          </div>
        </div>
      </div>
    </header>
  );
};
