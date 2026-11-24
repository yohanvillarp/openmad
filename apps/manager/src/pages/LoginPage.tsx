import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveMascot, useMascot } from '@/shared/ui/Mascot';
import { LoginForm } from '@/features/auth/ui/LoginForm';
import { RequestAccessForm, type ContributorRole } from '@/features/auth/ui/RequestAccessForm';
import { ThemeSelector } from '@/shared/ui/ThemeSelector';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import type { ThemeColor } from '@/shared/ui/types';
import { ArrowLeft, LogIn, UserPlus, ExternalLink } from 'lucide-react';

interface LoginPageProps {
  currentColor: ThemeColor;
  onColorChange: (c: ThemeColor) => void;
  onNavigateToDashboard: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  currentColor,
  onColorChange,
  onNavigateToDashboard,
}) => {
  const [activeMode, setActiveMode] = useState<'login' | 'request'>('login');

  // Reset scroll to top upon switching mode or loading page
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeMode]);

  // Automated smart mascot system
  const {
    mood,
    speech,
    onFocusInput,
    onBlurInput,
    onHoverMascot,
    onLeaveMascot,
    onActionSuccess,
    updateMood,
  } = useMascot({
    sleepTimeoutMs: 16000,
    enableAutoSleep: true,
    dialogues: {
      happy: '¡Hola! Bienvenido a OpenMad, hecho por y para estudiantes de la UNAMAD.',
      thinking: 'Revisando datos de acceso...',
      secure: '¡Modo protegido! Tu contraseña está a salvo y no miraré 🔒',
      excited: '¡Excelente! Gracias por sumar tu energía a OpenMad ★',
      sleeping: 'Zzz... En reposo hasta la próxima consulta...',
    },
  });

  const handleModeSwitch = (mode: 'login' | 'request') => {
    setActiveMode(mode);
    if (mode === 'request') {
      updateMood(
        'excited',
        '¡Genial que quieras unirte! Cuéntanos en qué te gustaría colaborar.'
      );
    } else {
      updateMood(
        'happy',
        '¡Hola de nuevo! Ingresa tus datos para acceder.'
      );
    }
  };

  const handleRequestSuccess = (role: ContributorRole) => {
    const roleLabels: Record<ContributorRole, string> = {
      estudiante: 'Estudiante',
      docente: 'Docente',
      madbot: 'MadBot',
    };
    onActionSuccess(
      `¡Solicitud enviada como ${roleLabels[role]}! Te responderemos muy pronto ★`
    );
  };

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-main)] antialiased om-grid-pattern relative flex flex-col justify-between selection:bg-[var(--accent-base)] selection:text-[var(--accent-contrast)]">
      {/* Top Floating Action Bar */}
      <header className="w-full px-4 sm:px-8 py-4 flex items-center justify-between z-20">
        <Button
          variant="secondary"
          size="sm"
          onClick={onNavigateToDashboard}
          icon={<ArrowLeft className="w-3.5 h-3.5" />}
        >
          Volver al Panel
        </Button>

        {/* Centered Colors without text */}
        <ThemeSelector currentColor={currentColor} onColorChange={onColorChange} />

        <div className="w-24 hidden sm:block" />
      </header>

      {/* Main Split Grid */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero: Automated Mascot & Student Community Info */}
          <div className="lg:col-span-5 space-y-5 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Identity Badge */}
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-base)] to-[var(--bg-surface)] p-[2px] shadow-lg shadow-[var(--accent-glow)]">
                <div className="flex h-full w-full items-center justify-center rounded-[9px] bg-[var(--bg-surface-elevated)] font-black text-[var(--accent-base)] om-font-display text-lg tracking-tighter">
                  M/
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black tracking-tight text-[var(--text-main)] om-font-display">
                    OPEN<span className="text-[var(--accent-base)]">MAD</span>
                  </span>
                  <Badge variant="accent" size="sm">
                    Manager
                  </Badge>
                </div>
                <span className="text-xs font-bold text-[var(--text-dim)] om-font-mono tracking-wider block">
                  DE ESTUDIANTES PARA ESTUDIANTES • UNAMAD
                </span>
              </div>
            </div>

            {/* Automated Reusable Mascot Component */}
            <div className="w-full max-w-sm flex justify-center lg:justify-start py-2">
              <InteractiveMascot
                mood={mood}
                speech={speech}
                size={155}
                onHover={onHoverMascot}
                onLeave={onLeaveMascot}
                onClick={onHoverMascot}
              />
            </div>

            {/* Purpose Note */}
            <p className="text-xs text-[var(--text-dim)] max-w-sm leading-relaxed hidden lg:block">
              Iniciativa independiente para guiar y optimizar el acceso a la información universitaria con experiencias reales verificadas por alumnos.
            </p>
          </div>

          {/* Right Form Card with Tab Switcher */}
          <div className="lg:col-span-7">
            <div className="om-card p-5 sm:p-7 backdrop-blur-2xl shadow-xl max-w-lg mx-auto">
              {/* Mode Switcher Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] mb-5">
                <button
                  type="button"
                  onClick={() => handleModeSwitch('login')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    activeMode === 'login'
                      ? 'bg-[var(--accent-base)] text-[var(--accent-contrast)] shadow-md shadow-[var(--accent-glow)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Iniciar Sesión
                </button>

                <button
                  type="button"
                  onClick={() => handleModeSwitch('request')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    activeMode === 'request'
                      ? 'bg-[var(--accent-base)] text-[var(--accent-contrast)] shadow-md shadow-[var(--accent-glow)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Solicitar Acceso
                </button>
              </div>

              {/* Form Content */}
              <AnimatePresence mode="wait">
                {activeMode === 'login' ? (
                  <motion.div
                    key="login-form"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="mb-4 pb-2.5 border-b border-[var(--border-subtle)]">
                      <h2 className="text-lg font-bold tracking-tight text-[var(--text-main)] om-font-display">
                        Iniciar Sesión
                      </h2>
                      <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                        Ingresa con tu correo institucional para continuar
                      </p>
                    </div>

                    <LoginForm
                      onSuccessLogin={onNavigateToDashboard}
                      onPasswordFocusChange={(isFocused) => {
                        if (isFocused) onFocusInput('password');
                        else onBlurInput();
                      }}
                      onMoodChange={(m) => updateMood(m)}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="request-form"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="mb-4 pb-2.5 border-b border-[var(--border-subtle)]">
                      <h2 className="text-lg font-bold tracking-tight text-[var(--text-main)] om-font-display">
                        Solicitar Acceso
                      </h2>
                      <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                        Forma parte de la comunidad estudiantil de OpenMad
                      </p>
                    </div>

                    <RequestAccessForm
                      onSuccessSubmit={handleRequestSuccess}
                      onFocusField={(type) => onFocusInput(type)}
                      onBlurField={onBlurInput}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with GitHub Link and 2026 */}
      <footer className="w-full px-4 sm:px-8 py-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 flex flex-col sm:flex-row items-center justify-between gap-3 z-10 text-xs">
        <span className="text-[var(--text-muted)] font-medium">
          &copy; 2026 OpenMad. Iniciativa estudiantil independiente y sin fines de lucro.
        </span>

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
      </footer>
    </div>
  );
};
