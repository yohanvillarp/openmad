import React, { useState } from 'react';
import { Cpu, Blocks } from 'lucide-react';
import type { RouteDefinition } from './types';
import { VANILLA_ROUTES } from './mocks/vanillaData';
import { ProcessNetworkCanvas } from './macro/ProcessNetworkCanvas';
import { ScratchStudio } from './scratch/ScratchStudio';

export type StudioView = 'network' | 'builder';

export const ProcessStudio: React.FC = () => {
  const [currentView, setCurrentView] = useState<StudioView>('network');
  const [routes, setRoutes] = useState<RouteDefinition[]>(VANILLA_ROUTES);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('practicas-preprofesionales');

  const currentRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

  const handleOpenProcessBuilder = (routeId: string) => {
    setSelectedRouteId(routeId);
    setCurrentView('builder');
  };

  const handleUpdateRoute = (updated: RouteDefinition) => {
    setRoutes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden space-y-2">
      {/* Top Floating Seamless Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase text-[var(--accent-base)] font-mono">
            OpenMad Process Studio
          </span>
          <span className="text-xs text-[var(--text-dim)] hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-2">
            {/* Route selector dropdown */}
            <select
              value={selectedRouteId}
              onChange={(e) => setSelectedRouteId(e.target.value)}
              className="bg-black/50 border border-white/20 text-white font-mono text-xs rounded px-2 py-0.5"
            >
              {routes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label} ({r.schoolLabel})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Level Switcher */}
        <div className="flex items-center bg-[var(--bg-surface-elevated)] p-1 rounded-lg border border-[var(--border-subtle)]">
          <button
            onClick={() => setCurrentView('network')}
            className={`px-3 py-1 rounded text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentView === 'network'
                ? 'bg-[var(--accent-base)] text-[var(--accent-contrast)] shadow'
                : 'text-[var(--text-dim)] hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>1. Red Macro</span>
          </button>
          <button
            onClick={() => setCurrentView('builder')}
            className={`px-3 py-1 rounded text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentView === 'builder'
                ? 'bg-[var(--accent-base)] text-[var(--accent-contrast)] shadow'
                : 'text-[var(--text-dim)] hover:text-white'
            }`}
          >
            <Blocks className="w-3.5 h-3.5" />
            <span>2. Bloques Modulares</span>
          </button>
        </div>
      </div>

      {/* Main Full-Bleed Content Area */}
      <div className="flex-1 w-full min-h-0 overflow-hidden flex flex-col">
        {currentView === 'network' ? (
          <ProcessNetworkCanvas onOpenProcessBuilder={handleOpenProcessBuilder} />
        ) : (
          <ScratchStudio
            route={currentRoute}
            onRouteChange={handleUpdateRoute}
            onReturnToCircuit={() => setCurrentView('network')}
          />
        )}
      </div>
    </div>
  );
};
