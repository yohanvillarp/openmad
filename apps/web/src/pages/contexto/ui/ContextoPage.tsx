import { useParams, Navigate, Link } from 'react-router';
import { motion } from 'framer-motion';

const MiniShapes = {
  ruta: () => <svg viewBox="0 0 100 100" className="w-[18px] h-[18px]"><polygon points="50,10 90,50 50,90 10,50" fill="currentColor" /></svg>,
  modulo: () => <svg viewBox="0 0 100 100" className="w-[18px] h-[18px]"><rect x="15" y="15" width="70" height="70" rx="14" fill="currentColor" /></svg>,
  paso: () => <svg viewBox="0 0 100 100" className="w-[18px] h-[18px]"><circle cx="50" cy="50" r="35" fill="currentColor" /></svg>,
  hito: () => <svg viewBox="0 0 100 100" className="w-[18px] h-[18px]"><polygon points="50,12 83,31 83,69 50,88 17,69 17,31" fill="currentColor" /></svg>,
};

const TABS = [
  { id: 'ruta', label: 'RUTA', Icon: MiniShapes.ruta },
  { id: 'modulo', label: 'MÓDULO', Icon: MiniShapes.modulo },
  { id: 'paso', label: 'PASO', Icon: MiniShapes.paso },
  { id: 'hito', label: 'HITO', Icon: MiniShapes.hito },
];

const CONTENT_DATA: Record<string, {
  title: string;
  definition: string;
  useCases: string[];
  Shape: React.FC;
}> = {
  ruta: {
    title: 'Ruta',
    definition: 'La Ruta representa el proceso padre o megaproceso. Es el objetivo académico más grande y de largo plazo que persigue el estudiante. Sirve para agrupar bajo un mismo paraguas procedimental todos los requisitos, pagos y validaciones necesarios para obtener un grado académico o finalizar un trámite institucional complejo.',
    useCases: [
      'Ruta para adquisición de Bachiller.',
      'Ruta para adquisición de Título Profesional.',
      'Ruta de traslado interno o externo.',
      'Ruta de reincorporación académica.'
    ],
    Shape: () => (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        <polygon points="50,10 90,50 50,90 10,50" fill="#0F172A" stroke="#ffffff" strokeWidth="4" />
      </svg>
    )
  },
  modulo: {
    title: 'Módulo',
    definition: 'El Módulo es un proceso hijo o proceso anidado dentro de una Ruta. Sirve para encapsular un conjunto de requisitos que por sí solos conforman un proceso complejo con múltiples dependencias. Permite al estudiante enfocarse en un bloque temático específico sin abrumarse por la Ruta completa. Un Módulo debe completarse para desbloquear las etapas finales de su Ruta contenedora.',
    useCases: [
      'Módulo de validación de Responsabilidad Social.',
      'Módulo de acreditación de Idioma Extranjero.',
      'Módulo de validación de Prácticas Pre-Profesionales.',
      'Módulo de presentación y aprobación de Proyecto de Tesis.'
    ],
    Shape: () => (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        <rect x="15" y="15" width="70" height="70" rx="14" fill="#334155" stroke="#ffffff" strokeWidth="4" />
      </svg>
    )
  },
  paso: {
    title: 'Paso',
    definition: 'El Paso es la unidad más atómica del grafo. Representa una acción simple, directa y ejecutable que el estudiante debe realizar. Sirve para trackear el progreso granular. Los Pasos pueden tener atributos específicos como costos (tarifas TUPA), ventanas de validez (fechas de caducidad) y plantillas de documentos descargables. Otorgan puntos de experiencia menores al completarse.',
    useCases: [
      'Pago de derecho de trámite TUPA por caja o plataforma virtual.',
      'Entrega de fotografías tamaño pasaporte.',
      'Presentación de Constancia de No Adeudo (biblioteca, laboratorios, clínica).',
      'Llenado y firma de Formulario Único de Trámite (FUT).'
    ],
    Shape: () => (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        <circle cx="50" cy="50" r="35" fill="#475569" stroke="#ffffff" strokeWidth="4" />
      </svg>
    )
  },
  hito: {
    title: 'Hito',
    definition: 'El Hito es un nodo especial que marca el final exitoso de un Módulo complejo o de una Ruta completa. No requiere una acción directa del estudiante, sino que se desbloquea automáticamente cuando se cumplen todos los Pasos y Módulos previos. Sirve como un punto de control (checkpoint) que otorga una gran cantidad de puntos de experiencia, dispara las celebraciones visuales (confeti) en la interfaz y formalmente habilita al estudiante para iniciar la siguiente Ruta.',
    useCases: [
      'Emisión de Resolución Decanal de Bachillerato.',
      'Entrega oficial de Diploma de Título Profesional.',
      'Aprobación definitiva de Expediente de Grado.',
      'Cierre y conformidad del Módulo de Responsabilidad Social.'
    ],
    Shape: () => (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        <polygon points="50,12 83,31 83,69 50,88 17,69 17,31" fill="#10B981" stroke="#ffffff" strokeWidth="4" />
      </svg>
    )
  }
};

export function ContextoPage() {
  const { seccion } = useParams();

  if (!seccion || !CONTENT_DATA[seccion]) {
    return <Navigate to="/contexto/ruta" replace />;
  }

  const currentData = CONTENT_DATA[seccion];
  const { Shape } = currentData;

  return (
    <div className="w-full max-w-[1000px] mx-auto px-6 py-12 flex flex-col items-center">
      
      {/* Barra de Pestañas (Tabs) */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 p-2 bg-surface-variant rounded-sm">
        {TABS.map((tab) => {
          const isActive = tab.id === seccion;
          const Icon = tab.Icon;
          return (
            <Link
              key={tab.id}
              to={`/contexto/${tab.id}`}
              className={`flex items-center gap-2 px-6 py-3 rounded-sm font-label-mono-sm uppercase tracking-wider transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface hover:bg-surface hover:text-primary-container'
              }`}
            >
              <Icon />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Contenido (Animado al cambiar de pestaña) */}
      <motion.div
        key={seccion}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-start"
      >
        {/* Columna Izquierda: Figura SVG grande */}
        <div className="flex justify-center items-center p-8 bg-surface-container-lowest rounded-sm border border-outline-variant shadow-sm w-full max-w-[300px] mx-auto aspect-square">
          <Shape />
        </div>

        {/* Columna Derecha: Texto descriptivo */}
        <div className="flex flex-col text-left">
          <h2 className="text-[32px] font-bold text-primary-container mb-4 flex items-center gap-3">
            {currentData.title}
          </h2>
          <p className="font-body-lg text-[17px] leading-relaxed text-on-surface-variant mb-8">
            {currentData.definition}
          </p>

          <h3 className="font-title-md font-semibold text-primary mb-4 uppercase tracking-wider">
            Casos de Uso Comunes
          </h3>
          <ul className="space-y-3">
            {currentData.useCases.map((useCase, index) => (
              <li key={index} className="flex items-start gap-3 text-on-surface">
                <span className="text-primary mt-1">•</span>
                <span className="font-body-md text-[15px] leading-relaxed">{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
      
    </div>
  );
}
