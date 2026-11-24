import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { ThemeColor } from './types';

interface ThemeSelectorProps {
  currentColor: ThemeColor;
  onColorChange: (color: ThemeColor) => void;
  className?: string;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentColor,
  onColorChange,
  className = '',
}) => {
  const colors: {
    id: ThemeColor;
    label: string;
    dotClass: string;
    checkClass: string;
  }[] = [
    {
      id: 'red',
      label: 'Rojo (Flame)',
      dotClass: 'bg-[#ff2a5f] shadow-[0_0_8px_#ff2a5f]',
      checkClass: 'text-white',
    },
    {
      id: 'blue',
      label: 'Azul (Cyber)',
      dotClass: 'bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]',
      checkClass: 'text-black',
    },
    {
      id: 'green',
      label: 'Verde (Matrix)',
      dotClass: 'bg-[#10b981] shadow-[0_0_8px_#10b981]',
      checkClass: 'text-black',
    },
    {
      id: 'white',
      label: 'Blanco (Frost)',
      dotClass: 'bg-white border-2 border-slate-300 shadow-[0_0_6px_rgba(0,0,0,0.15)]',
      checkClass: 'text-slate-900',
    },
    {
      id: 'black',
      label: 'Negro (Onyx)',
      dotClass: 'bg-zinc-950 border border-zinc-700 shadow-[0_0_6px_rgba(0,0,0,0.5)]',
      checkClass: 'text-white',
    },
  ];

  return (
    <div
      className={`flex items-center justify-center gap-1.5 p-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] backdrop-blur-xl shadow-md ${className}`}
    >
      {colors.map((c) => {
        const active = currentColor === c.id;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onColorChange(c.id)}
            title={c.label}
            className="relative p-1 rounded-full cursor-pointer transition-transform hover:scale-120 focus:outline-none"
          >
            <div
              className={`w-4 h-4 rounded-full ${c.dotClass} flex items-center justify-center transition-transform`}
            >
              {active && <Check className={`w-2.5 h-2.5 stroke-[3] ${c.checkClass}`} />}
            </div>
            {active && (
              <motion.div
                layoutId="activeColorRing"
                className="absolute inset-0 rounded-full ring-2 ring-[var(--accent-base)] ring-offset-2 ring-offset-[var(--bg-surface)]"
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
