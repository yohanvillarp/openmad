import React from 'react';
import {
  DollarSign,
  FileText,
  AlertTriangle,
  ShieldCheck,
  Copy,
  CheckSquare,
  Clock,
  Paperclip,
} from 'lucide-react';
import type { StepItem, PalettePieceType } from '../types';

interface SubPieceTogglesProps {
  step: StepItem | null;
  onTogglePiece: (type: PalettePieceType) => void;
}

export const SubPieceToggles: React.FC<SubPieceTogglesProps> = ({
  step,
  onTogglePiece,
}) => {
  if (!step) return null;

  const hasCost = !!step.cost;
  const hasDrive = !!step.drive;
  const hasValidity = !!step.validity;
  const hasAlert = !!step.guide?.introAlert;
  const hasCopyBox = !!step.guide?.keys?.some((k) => k.copyBox);
  const hasChecklist = !!(step.guide?.sections && step.guide.sections.length > 0);
  const hasInfoPanel = !!(step.guide?.infoPanels && step.guide.infoPanels.length > 0);
  const hasAttachment = !!(step.guide?.files && step.guide.files.length > 0);

  const items = [
    { type: 'cost' as const, label: 'Tasa / Costo Caja', active: hasCost, icon: DollarSign, color: 'orange', val: step.cost?.amount },
    { type: 'drive' as const, label: 'Plantilla Drive', active: hasDrive, icon: FileText, color: 'purple', val: 'Conectado ✓' },
    { type: 'validity' as const, label: 'Validación / Firma', active: hasValidity, icon: ShieldCheck, color: 'emerald', val: step.validity?.authority || 'Requerida' },
    { type: 'alert' as const, label: 'Alerta de Alumno', active: hasAlert, icon: AlertTriangle, color: 'rose', val: 'Activa ✓' },
    { type: 'copyBox' as const, label: 'Caja de Copiado', active: hasCopyBox, icon: Copy, color: 'sky', val: 'Plantilla ✓' },
    { type: 'checklist' as const, label: 'Auditoría / Checklist', active: hasChecklist, icon: CheckSquare, color: 'indigo', val: `${step.guide?.sections?.length || 0} secciones` },
    { type: 'infoPanel' as const, label: 'Plazos por Carrera', active: hasInfoPanel, icon: Clock, color: 'amber', val: 'Tabla activa ✓' },
    { type: 'attachment' as const, label: 'Reglamento Adjunto', active: hasAttachment, icon: Paperclip, color: 'slate', val: 'Adjuntado ✓' },
  ];

  return (
    <div className="space-y-1.5">
      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] font-bold mb-1">
        Piezas Acopladas al Paso ({items.filter((i) => i.active).length} / {items.length})
      </div>

      <div className="grid grid-cols-2 gap-1.5 max-h-[220px] overflow-y-auto pr-0.5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.type}
              type="button"
              onClick={() => onTogglePiece(item.type)}
              className={`p-2 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between text-xs ${
                item.active
                  ? 'bg-black/60 border-white/40 text-white shadow-sm ring-1 ring-white/20'
                  : 'bg-black/20 border-white/10 text-[var(--text-dim)] hover:border-white/25'
              }`}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <Icon className={`w-3.5 h-3.5 shrink-0 ${item.active ? 'text-white' : 'opacity-60'}`} />
                <span className="font-medium text-[11px] truncate">{item.label}</span>
              </div>
              <span className={`text-[9px] font-mono px-1 py-0.2 rounded shrink-0 ml-1 ${
                item.active ? 'bg-white/20 text-white' : 'text-slate-500'
              }`}>
                {item.active ? (item.val || '✓') : '+'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
