import { FlujoRuta } from '@widgets/flujo-ruta';

export function MiRutaPage() {
  return (
    <div className="w-full h-[calc(100vh-80px)] p-6 bg-surface flex flex-col gap-4">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="font-headline-lg text-[32px] font-bold text-primary-container leading-tight">
            Ingeniería de Sistemas e Informática
          </h1>
          <p className="font-body-md text-on-surface-variant">
            Ruta académica sugerida para obtener tu Bachiller y Título
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm font-label-mono-sm uppercase text-on-surface-variant">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-primary" /> Completado</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-500" /> En curso</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full border border-primary shadow-sm" /> Disponible</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-surface-variant" /> Bloqueado</div>
        </div>
      </div>
      
      <div className="flex-1 min-h-0">
        <FlujoRuta />
      </div>
    </div>
  );
}
