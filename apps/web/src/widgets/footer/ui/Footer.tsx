import { ShieldAlert } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant bg-surface-container-lowest py-lg px-lg mt-auto flex flex-col items-center">
      <div className="flex flex-col md:flex-row items-center gap-md text-on-surface-variant max-w-[900px] text-[12px] text-center md:text-left font-body-md">
        <ShieldAlert className="w-8 h-8 md:w-6 md:h-6 flex-shrink-0 text-outline" />
        <p className="leading-relaxed">
          <strong>Aviso Legal:</strong> Este proyecto es una iniciativa de código abierto sin fines de lucro, construida <strong>de estudiantes para estudiantes</strong>. 
          No tiene afiliación oficial, patrocinio, ni respaldo por parte de la administración universitaria. 
          Toda la información, costos (TUPA), y plantillas de documentos proporcionadas son de carácter referencial y están sujetas a cambios institucionales. 
          Recomendamos siempre verificar la información oficial en los canales de la universidad.
        </p>
      </div>
    </footer>
  );
}
