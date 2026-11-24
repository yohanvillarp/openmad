import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'success' | 'warning' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'accent',
  size = 'md',
  pulse = false,
  className = '',
}) => {
  const sizeStyles = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  let variantStyles = '';
  let pulseColor = '';

  switch (variant) {
    case 'accent':
      variantStyles =
        'bg-[var(--accent-subtle)] text-[var(--accent-base)] border border-[var(--accent-border)] font-medium';
      pulseColor = 'bg-[var(--accent-base)]';
      break;
    case 'success':
      variantStyles = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium';
      pulseColor = 'bg-emerald-400';
      break;
    case 'warning':
      variantStyles = 'bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium';
      pulseColor = 'bg-amber-400';
      break;
    case 'info':
      variantStyles = 'bg-sky-500/10 text-sky-400 border border-sky-500/20 font-medium';
      pulseColor = 'bg-sky-400';
      break;
    case 'neutral':
    default:
      variantStyles =
        'bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)] font-medium';
      pulseColor = 'bg-slate-400';
      break;
  }

  return (
    <span
      className={`om-badge inline-flex items-center gap-1.5 rounded-full select-none ${sizeStyles} ${variantStyles} ${className}`}
    >
      {pulse && <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${pulseColor}`} />}
      {children}
    </span>
  );
};
