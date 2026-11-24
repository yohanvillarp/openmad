import { Link } from 'react-router';
import { Network, User, BookOpen, MapPin, Building2 } from 'lucide-react';

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant">
      <div className="h-16 px-lg flex items-center justify-between max-w-[1200px] mx-auto w-full relative">
        
        {/* Izquierda: Logo */}
        <div className="flex items-center gap-12 z-10">
          <Link to="/" className="flex items-center gap-sm no-underline">
            <Network className="w-8 h-8 text-primary-container" strokeWidth={1.5} />
            <span className="font-headline-md text-[24px] font-semibold tracking-tight text-primary-container">
              openmad
            </span>
          </Link>
        </div>

        {/* Centro: Navegación */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          <Link to="/universidades" className="flex items-center gap-2 font-label-mono-sm text-[13px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
            <Building2 className="w-4 h-4" />
            <span>Universidades</span>
          </Link>
          <Link to="/miruta" className="flex items-center gap-2 font-label-mono-sm text-[13px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
            <MapPin className="w-4 h-4" />
            <span>Mi Ruta</span>
          </Link>
          <Link to="/contexto/ruta" className="flex items-center gap-2 font-label-mono-sm text-[13px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
            <BookOpen className="w-4 h-4" />
            <span>Contexto</span>
          </Link>
        </nav>

        {/* Derecha: Botón Perfil */}
        <button
          type="button"
          className="w-8 h-8 rounded-sm bg-primary-container flex items-center justify-center cursor-pointer hover:bg-primary-container/80 transition-colors z-10"
          aria-label="Perfil de usuario"
        >
          <User className="w-4 h-4 text-on-primary" />
        </button>
      </div>
    </header>
  );
}
