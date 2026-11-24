import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, GraduationCap, Briefcase, Bot } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import type { MascotMood } from '@/shared/ui/Mascot';

interface LoginFormProps {
  onSuccessLogin: () => void;
  onPasswordFocusChange?: (isFocused: boolean) => void;
  onMoodChange?: (mood: MascotMood) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccessLogin,
  onPasswordFocusChange,
  onMoodChange,
}) => {
  const [email, setEmail] = useState('yohan.villar@unamad.edu.pe');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'estudiante' | 'docente' | 'madbot'>('estudiante');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    onMoodChange?.('excited');

    setTimeout(() => {
      setIsLoading(false);
      onSuccessLogin();
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Compact Segmented Role Selector */}
      <div>
        <label className="text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider block mb-1.5 om-font-mono">
          Rol:
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
          {[
            { id: 'estudiante' as const, label: 'Estudiante', icon: GraduationCap },
            { id: 'docente' as const, label: 'Docente', icon: Briefcase },
            { id: 'madbot' as const, label: 'MadBot', icon: Bot },
          ].map((r) => {
            const Icon = r.icon;
            const isSelected = role === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-semibold cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[var(--accent-base)] text-[var(--accent-contrast)] shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="text-xs font-semibold text-[var(--text-muted)] block mb-1">
          Correo UNAMAD:
        </label>
        <div className="relative">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => onMoodChange?.('thinking')}
            onBlur={() => onMoodChange?.('happy')}
            placeholder="usuario@unamad.edu.pe"
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none focus:border-[var(--accent-base)] transition-colors"
          />
          <Mail className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[var(--text-dim)]" />
        </div>
      </div>

      {/* Password with Secure Mascot Interaction */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-semibold text-[var(--text-muted)]">
            Contraseña:
          </label>
          <a href="#olvide" className="text-[11px] text-[var(--accent-base)] hover:underline font-medium">
            ¿Olvidaste tu clave?
          </a>
        </div>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => {
              onPasswordFocusChange?.(true);
              onMoodChange?.('secure');
            }}
            onBlur={() => {
              onPasswordFocusChange?.(false);
              onMoodChange?.('happy');
            }}
            placeholder="••••••••"
            className="w-full pl-9 pr-9 py-2 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none focus:border-[var(--accent-base)] transition-colors"
          />
          <Lock className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[var(--text-dim)]" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-[var(--text-dim)] hover:text-[var(--text-main)] cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Remember me */}
      <div className="flex items-center justify-between text-xs pt-0.5">
        <label className="flex items-center gap-2 text-[var(--text-muted)] cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="rounded border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[var(--accent-base)] focus:ring-0"
          />
          <span>Recordar sesión</span>
        </label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={isLoading}
        className="w-full justify-center shadow-md shadow-[var(--accent-glow)] text-xs font-bold py-2.5"
        icon={
          isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
              className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <ArrowRight className="w-3.5 h-3.5" />
          )
        }
      >
        {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
      </Button>
    </form>
  );
};
