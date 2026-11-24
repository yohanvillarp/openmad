import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
  }[size];

  let variantStyles = '';

  if (variant === 'primary') {
    variantStyles =
      'text-[var(--accent-contrast)] bg-[var(--accent-base)] hover:opacity-95 shadow-lg shadow-[var(--accent-glow)] font-semibold';
  } else if (variant === 'secondary') {
    variantStyles =
      'bg-[var(--bg-surface-elevated)] text-[var(--text-main)] border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)] hover:border-[var(--border-hover)]';
  } else if (variant === 'outline') {
    variantStyles =
      'bg-transparent text-[var(--accent-base)] border border-[var(--accent-border)] hover:bg-[var(--accent-subtle)]';
  } else if (variant === 'ghost') {
    variantStyles =
      'bg-transparent text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)]';
  } else if (variant === 'danger') {
    variantStyles =
      'bg-rose-500/10 text-rose-400 border border-rose-500/25 hover:bg-rose-500/20';
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      className={`inline-flex items-center justify-center rounded-lg font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none transition-colors duration-150 ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
};
