import React from 'react';
import { cn } from '../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'info' | 'accent' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  size = 'sm',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center gap-1 font-mono font-semibold rounded-full select-none';

  const variants = {
    default: 'bg-white/10 text-white/90 border border-white/10',
    success: 'bg-[var(--status-success-bg)] text-[var(--status-success)] border border-[var(--status-success)]/30',
    warning: 'bg-[var(--status-warning-bg)] text-[var(--status-warning)] border border-[var(--status-warning)]/30',
    info: 'bg-[var(--status-info-bg)] text-[var(--status-info)] border border-[var(--status-info)]/30',
    accent: 'bg-[var(--accent-subtle)] text-[var(--accent-base)] border border-[var(--accent-border)]',
    outline: 'border border-[var(--border-subtle)] text-[var(--text-dim)]',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
