import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ScrollText,
  GraduationCap,
  FileCheck,
  SlidersHorizontal,
  Boxes,
  Flame,
  ExternalLink,
  LogIn,
} from 'lucide-react';

import type { ThemeColor } from '@/shared/ui/types';
import { ThemeSelector } from '@/shared/ui/ThemeSelector';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';

import { DashboardTab } from '@/pages/tabs/DashboardTab';
import { TramitesTab } from '@/pages/tabs/TramitesTab';
import { EstructuraTab } from '@/pages/tabs/EstructuraTab';
import { RequisitosTab } from '@/pages/tabs/RequisitosTab';
import { ConfiguracionTab } from '@/pages/tabs/ConfiguracionTab';
import { BuildersShowcase } from '@/pages/builders/BuildersShowcase';
import { LoginPage } from '@/pages/LoginPage';

type TabId = 'dashboard' | 'tramites' | 'builder' | 'estructura' | 'requisitos' | 'configuracion';

export default function App() {
  const [currentColor, setCurrentColor] = useState<ThemeColor>('red');
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [currentView, setCurrentView] = useState<'dashboard' | 'login'>('dashboard');

  useEffect(() => {
    document.documentElement.setAttribute('data-color', currentColor);
  }, [currentColor]);

  // Reset scroll to top upon switching view or tab
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView, activeTab]);

  // If in login view, show the dedicated login page
  if (currentView === 'login') {
    return (
      <div data-color={currentColor}>
        <LoginPage
          currentColor={currentColor}
          onColorChange={setCurrentColor}
          onNavigateToDashboard={() => setCurrentView('dashboard')}
        />
      </div>
    );
  }

  const tabs = [
    {
      id: 'dashboard' as TabId,
      label: 'Panel General',
      icon: LayoutDashboard,
      badge: 'EN VIVO',
    },
    {
      id: 'builder' as TabId,
      label: 'Estudio de Procesos',
      icon: Boxes,
      badge: 'PRO',
    },
    {
      id: 'tramites' as TabId,
      label: 'Guías de Trámites',
      icon: ScrollText,
      count: '6',
    },
    {
      id: 'estructura' as TabId,
      label: 'Estructura & Facultades',
      icon: GraduationCap,
      count: '3 Fac.',
    },
    {
      id: 'requisitos' as TabId,
      label: 'Requisitos & Formatos',
      icon: FileCheck,
      count: '6',
    },
    {
      id: 'configuracion' as TabId,
      label: 'Configuración & Tokens',
      icon: SlidersHorizontal,
    },
  ];

  return (
    <div
      data-color={currentColor}
      className="min-h-screen bg-[var(--bg-app)] text-[var(--text-main)] antialiased om-grid-pattern transition-colors duration-300 relative selection:bg-[var(--accent-base)] selection:text-[var(--accent-contrast)]"
    >
      {/* Dynamic ambient background aura */}
      <div className="fixed top-0 left-1/4 w-96 h-96 rounded-full bg-[var(--accent-glow)] blur-[140px] opacity-15 pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 rounded-full bg-[var(--accent-glow)] blur-[160px] opacity-10 pointer-events-none -z-10" />

      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/85 backdrop-blur-xl transition-colors duration-300">
        <div className="mx-auto flex flex-col md:flex-row md:h-18 max-w-7xl items-center justify-between px-4 py-3 md:py-0 sm:px-6 lg:px-8 gap-3">
          {/* Logo & Brand Identity (Featuring M/ for OpenMad & UNAMAD) */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-base)] via-[var(--accent-base)]/50 to-[var(--bg-surface)] p-[1.5px] shadow-lg shadow-[var(--accent-glow)]"
              >
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[var(--bg-surface-elevated)] font-black text-[var(--accent-base)] om-font-display text-lg tracking-tighter">
                  M/
                </div>
              </motion.div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-tight text-[var(--text-main)] om-font-display">
                    OPEN<span className="text-[var(--accent-base)]">MAD</span>
                  </span>
                  <Badge variant="accent" size="sm">
                    Manager
                  </Badge>
                </div>
                <p className="text-[10px] text-[var(--text-dim)] om-font-mono tracking-wider">
                  DE ESTUDIANTES PARA ESTUDIANTES • UNAMAD
                </p>
              </div>
            </div>

            {/* Mobile login button */}
            <div className="md:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView('login')}
                icon={<LogIn className="w-3.5 h-3.5" />}
              >
                Login
              </Button>
            </div>
          </div>

          {/* Centered Colors Selector (No Text, Centered Dots) */}
          <div className="flex items-center justify-center">
            <ThemeSelector
              currentColor={currentColor}
              onColorChange={setCurrentColor}
            />
          </div>

          {/* Quick Access to Login Page */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentView('login')}
              icon={<LogIn className="w-3.5 h-3.5" />}
            >
              Ver Pantalla Login
            </Button>
          </div>
        </div>

        {/* Tab Navigation with Animated Spring Indicator */}
        <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]/40 px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="mx-auto flex max-w-7xl gap-2 py-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors duration-150 ${
                    isActive
                      ? 'text-[var(--accent-contrast)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBubble"
                      className="absolute inset-0 rounded-lg bg-[var(--accent-base)] shadow-md shadow-[var(--accent-glow)]"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4 shrink-0 stroke-[2]" />
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                        isActive ? 'bg-black/30 text-white' : 'bg-[var(--accent-subtle)] text-[var(--accent-base)]'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                    {tab.count && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                          isActive
                            ? 'bg-black/25 text-[var(--accent-contrast)]'
                            : 'bg-[var(--bg-surface)] text-[var(--text-dim)] border border-[var(--border-subtle)]'
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Tab Content with Responsive Fullscreen Support */}
      <main
        className={
          activeTab === 'builder'
            ? 'w-full h-[calc(100vh-102px)] p-2 sm:p-3 flex flex-col overflow-hidden'
            : 'mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'
        }
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={activeTab === 'builder' ? 'w-full h-full flex flex-col overflow-hidden' : ''}
          >
            {activeTab === 'dashboard' && <DashboardTab />}
            {activeTab === 'builder' && <BuildersShowcase />}
            {activeTab === 'tramites' && <TramitesTab />}
            {activeTab === 'estructura' && <EstructuraTab />}
            {activeTab === 'requisitos' && <RequisitosTab />}
            {activeTab === 'configuracion' && (
              <ConfiguracionTab
                currentColor={currentColor}
                onColorChange={setCurrentColor}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modern Footer with GitHub & Year 2026 (Hidden during full-bleed builder mode) */}
      {activeTab !== 'builder' && (
        <footer className="mt-16 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 backdrop-blur-md py-6 text-xs text-[var(--text-dim)] transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[var(--accent-base)] animate-pulse" />
            <span className="font-bold text-[var(--text-main)]">
              &copy; 2026 OpenMad. Iniciativa estudiantil independiente y sin fines de lucro.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/yohanvillarp/openmad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-main)] hover:border-[var(--accent-base)] hover:text-[var(--accent-base)] transition-colors cursor-pointer group"
            >
              <img
                src="/assets/github.svg"
                alt="GitHub"
                className="w-4 h-4 transition-transform group-hover:scale-110"
              />
              <span className="font-semibold text-xs">GitHub</span>
              <ExternalLink className="w-3 h-3 text-[var(--text-dim)] group-hover:text-[var(--accent-base)]" />
            </a>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
}
