import React from 'react';
import {
  DollarSign,
  FileText,
  ExternalLink,
  AlertTriangle,
  ShieldCheck,
  Copy,
  CheckSquare,
  Clock,
  Paperclip,
  X,
  Check,
} from 'lucide-react';
import type { StepItem, PalettePieceType } from '../types';

interface StepDockedPiecesProps {
  step: StepItem;
  onRemovePiece: (type: PalettePieceType) => void;
}

export const StepDockedPieces: React.FC<StepDockedPiecesProps> = ({
  step,
  onRemovePiece,
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyBoxItem = step.guide?.keys?.find((k) => k.copyBox)?.copyBox;

  const handleCopy = (content: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-3 bg-[#0a1220] rounded-b-2xl space-y-2 border-b border-l border-r border-sky-900/60">
      {/* 1. Cost Piece */}
      {step.cost && (
        <div className="p-2 rounded-xl bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white flex items-center justify-between text-xs font-mono shadow-sm">
          <div className="flex items-center gap-2 min-w-0">
            <DollarSign className="w-4 h-4 text-yellow-200 shrink-0" />
            <div className="truncate">
              <span className="font-black text-white">{step.cost.amount}</span>
              <span className="text-[10px] text-orange-100 ml-1.5 truncate">({step.cost.concept})</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[9px] bg-black/30 px-2 py-0.5 rounded-full border border-white/20">
              {step.cost.place}
            </span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemovePiece('cost'); }}
              className="p-0.5 hover:bg-black/30 rounded"
              title="Desacoplar costo"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Drive Piece */}
      {step.drive && (
        <div className="p-2 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#7e22ce] text-white flex items-center justify-between text-xs font-mono shadow-sm">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-4 h-4 text-purple-200 shrink-0" />
            <span className="font-bold truncate max-w-[220px]">{step.drive.title}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={step.drive.driveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[9px] bg-black/30 hover:bg-black/50 text-white px-2 py-0.5 rounded-full border border-white/20 flex items-center gap-1"
            >
              <span>Drive</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemovePiece('drive'); }}
              className="p-0.5 hover:bg-black/30 rounded"
              title="Desacoplar Drive"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* 3. CopyBox Piece */}
      {copyBoxItem && (
        <div className="p-2 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white flex items-center justify-between text-xs font-mono shadow-sm">
          <div className="flex items-center gap-2 min-w-0">
            <Copy className="w-4 h-4 text-sky-200 shrink-0" />
            <span className="font-bold truncate text-[11px]">Plantilla de Solicitud / Correo</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={(e) => handleCopy(copyBoxItem.content, e)}
              className="text-[9px] bg-black/40 hover:bg-black/60 text-white px-2 py-0.5 rounded-full border border-white/20 flex items-center gap-1"
            >
              {copied ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemovePiece('copyBox'); }}
              className="p-0.5 hover:bg-black/30 rounded"
              title="Desacoplar plantilla"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* 4. Checklist / Sections Piece */}
      {step.guide?.sections && step.guide.sections.length > 0 && (
        <div className="p-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#4338ca] text-white space-y-1 text-xs font-mono shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-indigo-200" />
              <span className="font-bold text-[11px]">Auditoría de Normas ({step.guide.sections.length} secciones)</span>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemovePiece('checklist'); }}
              className="p-0.5 hover:bg-black/30 rounded"
              title="Desacoplar auditoría"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <div className="text-[10px] text-indigo-100/90 pl-5">
            {step.guide.sections.map((s) => s.title).join(' · ')}
          </div>
        </div>
      )}

      {/* 5. InfoPanel Piece (Plazos por Carrera) */}
      {step.guide?.infoPanels && step.guide.infoPanels.length > 0 && (
        <div className="p-2 rounded-xl bg-gradient-to-r from-[#d97706] to-[#b45309] text-white flex items-center justify-between text-xs font-mono shadow-sm">
          <div className="flex items-center gap-2 min-w-0">
            <Clock className="w-4 h-4 text-amber-200 shrink-0" />
            <div className="truncate">
              <span className="font-bold text-[11px] block">{step.guide.infoPanels[0].title}</span>
              <span className="text-[9px] text-amber-100">{step.guide.infoPanels[0].rows.length} carreras configuradas</span>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemovePiece('infoPanel'); }}
            className="p-0.5 hover:bg-black/30 rounded"
            title="Desacoplar tabla de plazos"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* 6. Validity Piece */}
      {step.validity && (
        <div className="p-2 rounded-xl bg-gradient-to-r from-[#10b981] to-[#047857] text-white flex items-center justify-between text-xs font-mono shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-200 shrink-0" />
            <span>Validación: <strong>{step.validity.authority}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] bg-black/30 px-2 py-0.5 rounded-full border border-white/20">
              {step.validity.deadline || 'Requerido'}
            </span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemovePiece('validity'); }}
              className="p-0.5 hover:bg-black/30 rounded"
              title="Desacoplar validación"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* 7. Alert Piece */}
      {step.guide?.introAlert && (
        <div className="p-2 rounded-xl bg-gradient-to-r from-[#f43f5e] to-[#be123c] text-white flex items-start justify-between text-xs font-mono shadow-sm">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-200 shrink-0 mt-0.5" />
            <span className="text-[11px] leading-snug">{step.guide.introAlert}</span>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemovePiece('alert'); }}
            className="p-0.5 hover:bg-black/30 rounded shrink-0 ml-1"
            title="Desacoplar alerta"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* 8. Attachment Piece */}
      {step.guide?.files && step.guide.files.length > 0 && (
        <div className="p-2 rounded-xl bg-gradient-to-r from-[#64748b] to-[#475569] text-white flex items-center justify-between text-xs font-mono shadow-sm">
          <div className="flex items-center gap-2 min-w-0">
            <Paperclip className="w-4 h-4 text-slate-200 shrink-0" />
            <span className="font-bold truncate text-[11px]">{step.guide.files[0].label}</span>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemovePiece('attachment'); }}
            className="p-0.5 hover:bg-black/30 rounded"
            title="Desacoplar adjunto"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Sequential Steps in Order */}
      {step.guide?.keys && step.guide.keys.length > 0 && (
        <div className="p-2 rounded-xl bg-black/50 border border-white/10 space-y-1.5 text-xs">
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
            En este orden ({step.guide.keys.length} tareas):
          </span>
          {step.guide.keys.map((k) => (
            <div key={k.code} className="text-slate-300 flex items-start gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-slate-800 text-slate-300 font-mono text-[8px] flex items-center justify-center shrink-0 mt-0.5 border border-slate-600">
                {k.code}
              </span>
              <span className="text-[11px] leading-relaxed">{k.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
