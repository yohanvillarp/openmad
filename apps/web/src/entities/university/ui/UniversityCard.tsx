import { Link } from 'react-router';
import { ArrowRight, Lock, UserRound, Map, ExternalLink } from 'lucide-react';
import type { University } from '../types';

interface Props {
  university: University;
}

export function UniversityCard({ university }: Props) {
  const isAvailable = university.isAvailable;

  return (
    <div
      className={`relative flex flex-col md:flex-row rounded-sm border ${
        isAvailable 
          ? 'border-outline-variant bg-surface hover:border-primary/50 hover:shadow-md transition-all group' 
          : 'border-outline-variant bg-surface-variant/50 opacity-80'
      } overflow-hidden`}
    >
      {/* Franja de Color / Logo */}
      <div 
        className="w-full md:w-64 p-6 flex flex-col items-center justify-center shrink-0 relative min-h-[120px]"
        style={{ backgroundColor: university.color }}
      >
        <h2 className="text-white font-headline-md font-bold tracking-widest text-3xl md:text-4xl z-10 text-center drop-shadow-sm">
          {university.initials}
        </h2>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Contenido Principal */}
      <div className="p-6 md:px-8 flex flex-col flex-1 justify-center">
        <h3 className="font-headline-sm text-[20px] md:text-[24px] font-bold text-primary-container mb-4 leading-tight">
          {university.name}
        </h3>
        
        {/* Contribuidores */}
        {university.contributors && university.contributors.length > 0 && (
          <div className="mt-2">
            <span className="font-label-mono-sm text-[11px] uppercase text-on-surface-variant/70 tracking-widest mb-3 block">
              Mantenido por estudiantes:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {university.contributors.map((contrib, idx) => {
                
                if (contrib.url) {
                  return (
                    <a 
                      key={idx} 
                      href={contrib.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-1.5 bg-primary/5 px-2.5 py-1 rounded-sm border border-primary/30 hover:border-primary hover:bg-primary/10 transition-colors relative z-20 text-primary"
                      title={`Ver perfil de ${contrib.name}`}
                    >
                      <UserRound className="w-3.5 h-3.5" />
                      <span className="font-label-sm text-[12px] font-medium">{contrib.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-70 ml-0.5" />
                    </a>
                  );
                }
                
                return (
                  <div key={idx} className="flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1 rounded-sm border border-outline-variant/50 text-on-surface-variant relative z-20">
                    <UserRound className="w-3.5 h-3.5 opacity-70" />
                    <span className="font-label-sm text-[12px]">{contrib.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Área de Acción */}
      <div className="p-6 border-t md:border-t-0 md:border-l border-outline-variant flex flex-col items-center justify-center shrink-0 md:w-56 bg-surface-container-lowest transition-colors group-hover:bg-primary/5">
        {isAvailable ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Map className="w-5 h-5 text-primary" />
              <span className="font-headline-sm text-[24px] text-primary font-bold">
                {university.routeCount}
              </span>
            </div>
            <span className="font-label-mono-sm text-[11px] uppercase text-on-surface-variant tracking-widest text-center mb-4">
              Rutas<br/>Disponibles
            </span>
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <ArrowRight className="w-5 h-5" />
            </div>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-on-surface-variant" />
            </div>
            <span className="font-label-mono-sm text-[12px] uppercase text-on-surface-variant tracking-widest text-center">
              Próximamente
            </span>
          </>
        )}
      </div>

      {isAvailable && (
        <Link to={`/universidades/${university.id}`} className="absolute inset-0 z-10" aria-label={`Ir a ${university.name}`} />
      )}
    </div>
  );
}
