import { UniversityCard, MOCK_UNIVERSITIES } from '@entities/university';
import { UniversityCta } from '@widgets/university-cta';
import { Building2 } from 'lucide-react';

export function UniversidadesPage() {
  return (
    <div className="w-full max-w-[1000px] mx-auto px-6 py-12">
      
      <div className="flex flex-col gap-4 mb-12">
        <div className="relative w-fit">
          <div className="flex items-center gap-3 relative z-10">
            <Building2 className="w-8 h-8 text-primary" strokeWidth={2.5} />
            <h1 className="font-headline-lg text-[40px] md:text-[48px] font-bold text-primary-container tracking-tight leading-tight">
              Universidades
            </h1>
          </div>
          {/* Subrayado bonito */}
          <div className="absolute -bottom-1 left-0 w-full h-1.5 bg-gradient-to-r from-primary/50 to-transparent rounded-full" />
        </div>
        <p className="font-body-lg text-[18px] text-on-surface-variant max-w-[800px] leading-relaxed mt-2">
          Selecciona tu universidad para ver las rutas académicas y trámites disponibles, organizados paso a paso.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-12">
        {MOCK_UNIVERSITIES.map((uni) => (
          <UniversityCard key={uni.id} university={uni} />
        ))}
      </div>

      {/* Banner Horizontal (Módulo CTA) */}
      <UniversityCta />

    </div>
  );
}
