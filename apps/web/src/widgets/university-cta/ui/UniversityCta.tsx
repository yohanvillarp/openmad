import { Users, Mail } from 'lucide-react';
import { Button } from '@shared/ui/button';

export function UniversityCta() {
  return (
    <div className="w-full mt-16 p-8 md:p-12 rounded-sm bg-surface-container-lowest border border-outline-variant flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm relative overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      {/* Content */}
      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 z-10">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <div className="flex flex-col">
          <h3 className="font-headline-sm text-[26px] font-bold text-primary-container mb-2">
            ¡Suma a tu Universidad!
          </h3>
          <p className="font-body-md text-[16px] text-on-surface-variant max-w-[580px] leading-relaxed">
            <strong className="text-primary-container">openmad</strong> es un esfuerzo colaborativo de estudiantes para estudiantes. Si conoces los trámites de tu facultad, únete al equipo y ayúdanos a mapearlos para que nadie más sufra con la burocracia.
          </p>
        </div>
      </div>
      
      {/* Button */}
      <div className="z-10 shrink-0 w-full md:w-auto">
        <a 
          href="mailto:admin@openmad.com?subject=Quiero sumar a mi Universidad a openmad" 
          className="w-full inline-block group"
        >
          <Button variant="primary" className="w-full md:w-36 h-32 md:h-36 flex flex-col items-center justify-center gap-3 p-4 hover:-translate-y-1 transition-transform">
            <Mail className="w-8 h-8" />
            <span className="text-center text-[12px] leading-tight">
              QUIERO<br/>COLABORAR
            </span>
          </Button>
        </a>
      </div>

    </div>
  );
}
