import React from 'react';
import { motion } from 'framer-motion';

export * from './Mascot/types';
export * from './Mascot/useMascot';
export * from './Mascot/InteractiveMascot';

export type MascotMood = 'happy' | 'thinking' | 'sleeping' | 'secure' | 'excited';

export interface MascotProps {
  mood?: MascotMood;
  size?: number;
  className?: string;
  showHalo?: boolean;
}

export const Mascot: React.FC<MascotProps> = ({
  mood = 'happy',
  size = 140,
  className = '',
  showHalo = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ambient Glow Aura */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-40 pointer-events-none transition-colors duration-300"
        style={{ background: 'var(--accent-glow)' }}
      />

      <motion.svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        animate={{
          y: mood === 'excited' ? [-6, 6, -6] : [-3, 3, -3],
          rotate: mood === 'thinking' ? [-2, 3, -2] : [0, 1, 0, -1, 0],
        }}
        transition={{
          duration: mood === 'excited' ? 1.8 : 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative z-10 drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Chassis body gradient */}
          <linearGradient id="mascotBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--mascot-chassis-bg)" />
            <stop offset="100%" stopColor="var(--bg-surface-elevated)" />
          </linearGradient>

          {/* Ears accent glow gradient */}
          <linearGradient id="mascotEarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-base)" />
            <stop offset="100%" stopColor="var(--accent-hover)" />
          </linearGradient>

          {/* Visor: Deep gloss cyber glass */}
          <linearGradient id="mascotVisorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a0d14" />
            <stop offset="100%" stopColor="#151b27" />
          </linearGradient>

          <filter id="mascotGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Grounding Shadow */}
        <ellipse cx="100" cy="186" rx="36" ry="5" fill="rgba(0,0,0,0.12)" />

        {/* 1. Cyber Halo / Floating Tech Ring */}
        {showHalo && (
          <motion.g
            animate={{
              rotate: [0, 360],
              y: [-1, 1, -1],
            }}
            transition={{
              rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
              y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
            style={{ transformOrigin: '100px 35px' }}
          >
            <ellipse
              cx="100"
              cy="35"
              rx="46"
              ry="11"
              stroke="var(--accent-base)"
              strokeWidth="2.5"
              strokeDasharray="14 8 26 8"
              opacity="0.9"
              filter="url(#mascotGlow)"
            />
            <circle cx="56" cy="36" r="2.5" fill="var(--accent-base)" />
            <circle cx="144" cy="36" r="2.5" fill="var(--accent-base)" />
          </motion.g>
        )}

        {/* 2. Cyber Fox / Android Ears */}
        {/* Left Ear */}
        <motion.path
          d="M 68 70 L 32 30 C 30 28 35 48 45 74 Z"
          fill="url(#mascotBodyGrad)"
          stroke="var(--mascot-chassis-stroke)"
          strokeWidth="2"
          animate={{ rotate: mood === 'excited' ? [-4, 6, -4] : [-1, 2, -1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '68px 70px' }}
        />
        <motion.path
          d="M 62 65 L 40 38 C 38 36 42 50 49 67 Z"
          fill="url(#mascotEarGrad)"
          opacity="0.95"
          filter="url(#mascotGlow)"
        />

        {/* Right Ear */}
        <motion.path
          d="M 132 70 L 168 30 C 170 28 165 48 155 74 Z"
          fill="url(#mascotBodyGrad)"
          stroke="var(--mascot-chassis-stroke)"
          strokeWidth="2"
          animate={{ rotate: mood === 'excited' ? [4, -6, 4] : [1, -2, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '132px 70px' }}
        />
        <motion.path
          d="M 138 65 L 160 38 C 162 36 158 50 151 67 Z"
          fill="url(#mascotEarGrad)"
          opacity="0.95"
          filter="url(#mascotGlow)"
        />

        {/* 3. Floating Robotic Hands */}
        {/* Left Hand */}
        <motion.ellipse
          cx="48"
          cy={mood === 'secure' ? '92' : '138'}
          rx="11"
          ry="9"
          fill="url(#mascotBodyGrad)"
          stroke="var(--accent-base)"
          strokeWidth="2"
          animate={
            mood === 'secure'
              ? { x: [0, 8, 0], y: [0, -2, 0] }
              : { y: [-3, 3, -3] }
          }
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Right Hand */}
        <motion.ellipse
          cx="152"
          cy={mood === 'secure' ? '92' : '138'}
          rx="11"
          ry="9"
          fill="url(#mascotBodyGrad)"
          stroke="var(--accent-base)"
          strokeWidth="2"
          animate={
            mood === 'secure'
              ? { x: [0, -8, 0], y: [0, -2, 0] }
              : { y: [3, -3, 3] }
          }
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* 4. Head Outer Chassis */}
        <rect
          x="50"
          y="52"
          width="100"
          height="88"
          rx="32"
          fill="url(#mascotBodyGrad)"
          stroke="var(--mascot-chassis-stroke)"
          strokeWidth="2"
        />

        {/* Tech Corner Details on Helmet */}
        <path d="M 64 58 L 74 58" stroke="var(--accent-base)" strokeWidth="2" strokeLinecap="round" />
        <path d="M 126 58 L 136 58" stroke="var(--accent-base)" strokeWidth="2" strokeLinecap="round" />

        {/* 5. Visor / Faceplate (Dark Glossy Cyber Glass) */}
        <rect
          x="60"
          y="68"
          width="80"
          height="56"
          rx="18"
          fill="url(#mascotVisorGrad)"
          stroke="var(--mascot-chassis-stroke)"
          strokeWidth="1.5"
        />

        {/* Visor Specular Reflection */}
        <path
          d="M 66 74 C 74 72, 110 72, 126 76"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* 6. Dynamic Facial Eyes (Uses var(--mascot-eye) for intense glowing visibility!) */}
        {mood === 'happy' && (
          <g filter="url(#mascotGlow)">
            {/* Cute Happy Curved Eyes (^ ‿ ^) */}
            <path
              d="M 74 95 C 78 86, 88 86, 92 95"
              stroke="var(--mascot-eye)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="83" cy="98" r="1.5" fill="var(--mascot-eye)" />

            <path
              d="M 108 95 C 112 86, 122 86, 126 95"
              stroke="var(--mascot-eye)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="117" cy="98" r="1.5" fill="var(--mascot-eye)" />

            {/* Blush cheeks */}
            <ellipse cx="73" cy="103" rx="4" ry="2" fill="var(--mascot-eye)" opacity="0.4" />
            <ellipse cx="127" cy="103" rx="4" ry="2" fill="var(--mascot-eye)" opacity="0.4" />
          </g>
        )}

        {mood === 'excited' && (
          <g filter="url(#mascotGlow)">
            {/* Star Sparkle Eyes (★ ‿ ★) */}
            <path
              d="M 83 85 L 85 91 L 91 93 L 85 95 L 83 101 L 81 95 L 75 93 L 81 91 Z"
              fill="var(--mascot-eye)"
            />
            <path
              d="M 117 85 L 119 91 L 125 93 L 119 95 L 117 101 L 115 95 L 109 93 L 115 91 Z"
              fill="var(--mascot-eye)"
            />
            <path
              d="M 96 102 Q 100 106 104 102"
              stroke="var(--mascot-eye)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        )}

        {mood === 'thinking' && (
          <g filter="url(#mascotGlow)">
            <circle cx="83" cy="93" r="5" fill="var(--mascot-eye)" />
            <path
              d="M 112 94 Q 118 88 124 94"
              stroke="var(--mascot-eye)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="100" cy="80" r="1.5" fill="var(--mascot-eye)" />
            <circle cx="104" cy="76" r="2" fill="var(--mascot-eye)" />
          </g>
        )}

        {mood === 'sleeping' && (
          <g filter="url(#mascotGlow)">
            <path d="M 76 96 L 90 96" stroke="var(--mascot-eye)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 110 96 L 124 96" stroke="var(--mascot-eye)" strokeWidth="3" strokeLinecap="round" />
            <text x="135" y="75" fill="var(--mascot-eye)" fontSize="12" fontWeight="bold" fontFamily="monospace">z</text>
          </g>
        )}

        {mood === 'secure' && (
          <g filter="url(#mascotGlow)">
            <rect x="91" y="85" width="18" height="15" rx="3" fill="var(--mascot-eye)" />
            <path
              d="M 95 85 L 95 81 C 95 78 105 78 105 81 L 105 85"
              stroke="var(--mascot-eye)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="100" cy="92" r="2" fill="#0a0d14" />
            <path d="M 75 92 Q 80 89 85 92" stroke="var(--mascot-eye)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 115 92 Q 120 89 125 92" stroke="var(--mascot-eye)" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* 7. Lower Torso & Core Reactor */}
        <path
          d="M 78 140 L 84 165 C 85 168 115 168 116 165 L 122 140 Z"
          fill="url(#mascotBodyGrad)"
          stroke="var(--mascot-chassis-stroke)"
          strokeWidth="1.5"
        />

        {/* Core Reactor (Pulsing Diamond Heart) */}
        <motion.g
          animate={{ scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '100px 152px' }}
        >
          <polygon
            points="100,145 107,152 100,159 93,152"
            fill="var(--accent-base)"
            filter="url(#mascotGlow)"
          />
        </motion.g>

        {/* Micro Tech Collar Line */}
        <line
          x1="86"
          y1="140"
          x2="114"
          y2="140"
          stroke="var(--accent-base)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
};
