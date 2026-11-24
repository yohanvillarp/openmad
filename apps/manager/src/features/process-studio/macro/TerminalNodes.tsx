import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { CheckCircle2 } from 'lucide-react';

export const StartPrereqNode: React.FC<{
  data: { title: string; minCredits: number; faculty: string };
}> = ({ data }) => (
  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-950 via-slate-900 to-black border-2 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)] min-w-[220px] text-white">
    <div className="flex items-center gap-1.5 mb-1">
      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
      <span className="text-[9px] font-mono font-bold uppercase text-amber-300 tracking-wider">
        Condición Previa
      </span>
    </div>
    <h4 className="text-xs font-black text-white om-font-display leading-tight">{data.title}</h4>
    <div className="mt-2 text-[10px] font-mono text-amber-200 bg-amber-950/60 p-1.5 rounded-lg border border-amber-500/30">
      Mínimo: <strong>{data.minCredits} Créditos</strong>
    </div>
    <Handle
      type="source"
      position={Position.Right}
      className="!w-3 !h-3 !bg-amber-400 !border-2 !border-black"
    />
  </div>
);

export const FinalResolutionNode: React.FC<{
  data: { title: string; desc: string };
}> = ({ data }) => (
  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-black border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] min-w-[220px] text-white">
    <Handle
      type="target"
      position={Position.Left}
      className="!w-3 !h-3 !bg-emerald-400 !border-2 !border-black"
    />
    <div className="flex items-center gap-1 mb-1">
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
      <span className="text-[9px] font-mono font-bold uppercase text-emerald-300 tracking-wider">
        Resolución / Grado
      </span>
    </div>
    <h4 className="text-xs font-black text-white om-font-display leading-tight">{data.title}</h4>
    <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">{data.desc}</p>
  </div>
);
