import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  caption?: string;
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  caption,
  icon,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="om-card p-5 relative overflow-hidden group"
    >
      {/* Dynamic ambient hover glow */}
      <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-[var(--accent-glow)] blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] om-font-mono">
          {title}
        </span>
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-subtle)] text-[var(--accent-base)] border border-[var(--accent-border)] transition-transform duration-200 group-hover:scale-110">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2.5">
        <span className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-main)] om-font-display">
          {value}
        </span>
        {change && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
              isPositive
                ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3 stroke-[2.5]" />
            ) : (
              <TrendingDown className="w-3 h-3 stroke-[2.5]" />
            )}
            {change}
          </span>
        )}
      </div>

      {caption && (
        <p className="mt-2 text-xs text-[var(--text-dim)] truncate">{caption}</p>
      )}
    </motion.div>
  );
};
