import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
  subtitle?: string;
  badge?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  header,
  footer,
  title,
  subtitle,
  badge,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`om-card p-5 sm:p-6 transition-all duration-200 ${className}`}
      {...props}
    >
      {(header || title || badge) && (
        <div className="mb-4 flex items-start justify-between gap-4 pb-3 border-b border-[var(--border-subtle)]">
          {header ? (
            header
          ) : (
            <div>
              {title && (
                <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[var(--text-main)]">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-1 text-xs text-[var(--text-muted)]">{subtitle}</p>
              )}
            </div>
          )}
          {badge && <div className="shrink-0">{badge}</div>}
        </div>
      )}

      <div>{children}</div>

      {footer && (
        <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
          {footer}
        </div>
      )}
    </div>
  );
};
