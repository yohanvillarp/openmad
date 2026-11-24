import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success';
  children: ReactNode;
}

const VARIANT_CLASSES = {
  primary: 'bg-primary-container text-on-primary active:bg-primary-container/80',
  secondary: 'border border-primary-container text-primary-container bg-transparent active:bg-surface-container',
  success: 'bg-secondary text-on-secondary active:bg-secondary/80',
} as const;

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseClasses =
    'py-md px-lg font-label-mono text-[14px] tracking-[0.05em] rounded-sm flex items-center justify-center gap-sm transition-all duration-200 uppercase cursor-pointer';

  return (
    <button className={`${baseClasses} ${VARIANT_CLASSES[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
