import React from 'react';
import type { MascotMood } from './types';

export const MascotEyes: React.FC<{ mood: MascotMood }> = ({ mood }) => {
  return (
    <>
      {mood === 'happy' && (
        <g filter="url(#mascotGlow)">
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
          <ellipse cx="73" cy="103" rx="4" ry="2" fill="var(--mascot-eye)" opacity="0.4" />
          <ellipse cx="127" cy="103" rx="4" ry="2" fill="var(--mascot-eye)" opacity="0.4" />
        </g>
      )}

      {mood === 'excited' && (
        <g filter="url(#mascotGlow)">
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
    </>
  );
};
