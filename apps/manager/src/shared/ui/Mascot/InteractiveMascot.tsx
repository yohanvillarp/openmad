import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mascot } from '../Mascot';
import type { MascotMood } from './types';

export interface InteractiveMascotProps {
  mood: MascotMood;
  speech?: string;
  size?: number;
  className?: string;
  onHover?: () => void;
  onLeave?: () => void;
  onClick?: () => void;
}

export const InteractiveMascot: React.FC<InteractiveMascotProps> = ({
  mood,
  speech,
  size = 155,
  className = '',
  onHover,
  onLeave,
  onClick,
}) => {
  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Dynamic Animated Speech Bubble */}
      <AnimatePresence mode="wait">
        {speech && (
          <motion.div
            key={speech}
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="mb-4 px-4 py-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-main)] font-medium max-w-xs shadow-xl relative text-center"
          >
            <p className="leading-relaxed">{speech}</p>
            {/* Speech bubble pointer arrow */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--bg-surface)] border-b border-r border-[var(--border-subtle)] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot with interactive hover & tap reactions */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}
        className="cursor-pointer"
        title="¡Haz clic en la mascota para interactuar!"
      >
        <Mascot mood={mood} size={size} />
      </motion.div>
    </div>
  );
};
