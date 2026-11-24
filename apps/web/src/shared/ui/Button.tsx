import React from 'react';
import { cn } from '../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'secondary',
  size = 'md',
  icon,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 cursor-pointer select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary:
      'bg-[var(--accent-base)] text-[var(--accent-contrast)] hover:opacity-90 font-bold shadow-[0_0_15px_var(--accent-glow)]',
    accent:
      'bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)]',
    secondary:
      'bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-main)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)]',
    ghost:
      'hover:bg-white/5 text-[var(--text-muted)] hover:text-white',
    outline:
      'border border-[var(--border-subtle)] hover:border-[var(--accent-base)] text-[var(--text-main)] hover:bg-[var(--accent-subtle)]',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5',
    md: 'text-xs px-3.5 py-2',
    lg: 'text-sm px-4 py-2.5',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
