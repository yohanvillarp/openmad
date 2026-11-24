import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Building, DollarSign, FileText, CheckCircle2, Blocks } from 'lucide-react';
import type { MacroProcessData } from '../types';

export const ProcessCardNode: React.FC<{ data: MacroProcessData }> = ({ data }) => {
  return (
    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#0a1426] via-[#070e1c] to-[#040810] border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.3)] min-w-[270px] max-w-[300px] text-white">
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-cyan-400 !border-2 !border-black"
      />

      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="text-[9px] font-mono uppercase font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
          {data.category}
        </span>
        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
          <CheckCircle2 className="w-2.5 h-2.5" />
          {data.status === 'published' ? 'Publicado' : 'Borrador'}
        </span>
      </div>

      <h3 className="text-xs font-black text-white om-font-display tracking-tight leading-snug">
        {data.title}
      </h3>

      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5 font-mono">
        <Building className="w-3 h-3 text-cyan-400 shrink-0" />
        <span className="truncate">{data.faculty}</span>
      </div>

      <div className="grid grid-cols-3 gap-1 my-2.5 p-1.5 rounded-xl bg-black/60 border border-white/10 text-center font-mono text-[10px]">
        <div>
          <span className="text-[8px] text-slate-400 block">Pasos</span>
          <span className="font-black text-white">{data.stepsCount}</span>
        </div>
        <div>
          <span className="text-[8px] text-slate-400 block">Aranceles</span>
          <span className="font-black text-amber-400 flex items-center justify-center">
            <DollarSign className="w-2.5 h-2.5" />
            {data.totalCost}
          </span>
        </div>
        <div>
          <span className="text-[8px] text-slate-400 block">Drive</span>
          <span className="font-black text-purple-300 flex items-center justify-center">
            <FileText className="w-2.5 h-2.5" />
            {data.driveDocs}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => data.onOpenBuilder?.(data.id)}
        className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-[11px] font-mono shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
      >
        <Blocks className="w-3.5 h-3.5" />
        <span>Ensamblador de Pasos</span>
      </button>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-cyan-400 !border-2 !border-black"
      />
    </div>
  );
};
