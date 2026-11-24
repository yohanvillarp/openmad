import { Link } from 'react-router';
import { ArrowRight, Lock } from 'lucide-react';
import type { Career } from '../types';

interface Props {
  career: Career;
  universityColor: string;
}

export function CareerCard({ career, universityColor }: Props) {
  const isAvailable = career.isAvailable;

  return (
    <div
      className={`relative flex flex-col md:flex-row rounded-sm border ${
        isAvailable 
          ? 'border-outline-variant bg-surface hover:shadow-md transition-all group' 
          : 'border-outline-variant bg-surface-variant/50 opacity-80'
      } overflow-hidden`}
    >
      {/* Indicador de Disponibilidad */}
      <div 
        className="w-2 md:w-3 shrink-0 transition-colors"
        style={{ backgroundColor: isAvailable ? universityColor : 'transparent' }}
      />

      {/* Contenido Principal */}
      <div className="p-5 md:px-6 flex flex-col flex-1 justify-center">
        <div className="flex items-center gap-3 mb-1">
          <span className="font-headline-md text-[18px] md:text-[20px] font-bold text-primary-container">
            {career.initials}
          </span>
          {!isAvailable && (
            <span className="bg-surface-variant px-2 py-0.5 rounded-sm font-label-mono-sm text-[10px] uppercase tracking-widest text-on-surface-variant flex items-center gap-1">
              <Lock className="w-3 h-3" /> Bloqueado
            </span>
          )}
        </div>
        <p className="font-body-md text-on-surface-variant">
          {career.name}
        </p>
      </div>

      {/* Área de Acción */}
      <div className="p-4 border-t md:border-t-0 md:border-l border-outline-variant flex items-center justify-between md:justify-center md:w-32 bg-surface-container-lowest transition-colors group-hover:bg-primary/5">
        {isAvailable ? (
          <>
            <span className="font-label-mono-sm text-[11px] uppercase text-primary tracking-widest block md:hidden">
              Ver Ruta
            </span>
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center md:group-hover:scale-110 transition-transform shadow-sm">
              <ArrowRight className="w-5 h-5" />
            </div>
          </>
        ) : (
          <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center opacity-50">
            <Lock className="w-4 h-4 text-on-surface-variant" />
          </div>
        )}
      </div>

      {isAvailable && (
        <Link to={`/miruta?career=${career.id}`} className="absolute inset-0 z-10" aria-label={`Ir a ruta de ${career.name}`} />
      )}
    </div>
  );
}
