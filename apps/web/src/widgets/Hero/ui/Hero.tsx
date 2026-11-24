import { Button } from '@shared/ui/button/index';
import { ArrowRight, GraduationCap, Map, Target } from 'lucide-react';
import { AnimatedGraph } from './AnimatedGraph';
import { GithubIcon } from '@shared/ui/icon';
import { Link } from 'react-router';

export function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-12 md:py-24 bg-surface max-w-[1200px] mx-auto w-full flex-1 gap-8 md:gap-16">
      
      {/* Columna Izquierda: Textos */}
      <div className="flex flex-col items-start text-left flex-1 w-full">
        {/* Badge y Github */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-sm font-label-mono-sm uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>De Estudiantes Para Estudiantes</span>
          </div>
          <a
            href="https://github.com/yohanvillarp/openmad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary transition-colors"
            title="Ver repositorio en GitHub"
            aria-label="Ver repositorio en GitHub"
          >
            <GithubIcon className="w-6 h-6" />
          </a>
        </div>

        <h1 className="font-headline-lg text-[40px] md:text-[56px] font-bold text-primary-container mb-4 tracking-tight leading-[1.1]">
          Tu Universidad,<br />Paso a Paso.
        </h1>

        <p className="font-body-lg text-[18px] text-on-surface-variant max-w-[540px] mb-8 leading-relaxed">
          Deja de buscar en PDFs viejos y preguntar en 5 oficinas distintas. Aquí ves todos los trámites que necesitas: qué cuesta, cuándo vence y qué documentos pedir. Todo en una ruta clara.
        </p>

        {/* Características */}
        <div className="flex flex-wrap items-center gap-6 mb-10">
          <div className="flex items-center gap-2 text-on-surface-variant font-label-mono-sm">
            <Map className="w-4 h-4 text-secondary" />
            <span>Ruta visual clara</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant font-label-mono-sm">
            <Target className="w-4 h-4 text-secondary" />
            <span>Metas desbloqueables</span>
          </div>
        </div>

        <Link to="/universidades" className="w-full md:w-auto">
          <Button variant="primary" className="w-full px-8 py-[14px]">
            SELECCIONAR UNIVERSIDAD
            <ArrowRight className="w-[18px] h-[18px] ml-2" strokeWidth={2} />
          </Button>
        </Link>
      </div>

      {/* Columna Derecha: SVG Animado */}
      <div className="flex-1 w-full flex justify-center md:justify-end items-center mt-8 md:mt-0">
        <AnimatedGraph />
      </div>

    </section>
  );
}
