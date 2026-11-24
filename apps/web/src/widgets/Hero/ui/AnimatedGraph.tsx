import { motion, type Variants } from 'framer-motion';
import { useNavigate } from 'react-router';

export function AnimatedGraph() {
  const navigate = useNavigate();
  const positions = {
    ruta: { cx: 100, cy: 110, label: 'Ruta' },
    modulo: { cx: 300, cy: 110, label: 'Módulo' },
    paso: { cx: 300, cy: 290, label: 'Paso' },
    hito: { cx: 100, cy: 290, label: 'Hito' },
  };

  const nodeAnimation: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 1.2, type: 'spring', stiffness: 200, damping: 15 },
    }),
  };

  const drawLine: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 1.2 + 0.6, type: 'spring', duration: 1.2, bounce: 0 },
        opacity: { delay: i * 1.2 + 0.6, duration: 0.1 },
      },
    }),
  };

  const handleNodeClick = (seccion: string) => {
    navigate(`/contexto/${seccion}`);
  };

  return (
    <div className="w-full max-w-[400px] aspect-square flex items-center justify-center relative">
      <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-sm overflow-visible">
        
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
          </marker>
        </defs>

        <motion.line x1={positions.ruta.cx + 45} y1={positions.ruta.cy} x2={positions.modulo.cx - 45} y2={positions.modulo.cy} stroke="#10B981" strokeWidth="3" markerEnd="url(#arrowhead)" custom={0} variants={drawLine} initial="hidden" animate="visible" />
        <motion.line x1={positions.modulo.cx} y1={positions.modulo.cy + 45} x2={positions.paso.cx} y2={positions.paso.cy - 45} stroke="#10B981" strokeWidth="3" markerEnd="url(#arrowhead)" custom={1} variants={drawLine} initial="hidden" animate="visible" />
        <motion.line x1={positions.paso.cx - 45} y1={positions.paso.cy} x2={positions.hito.cx + 45} y2={positions.hito.cy} stroke="#10B981" strokeWidth="3" markerEnd="url(#arrowhead)" custom={2} variants={drawLine} initial="hidden" animate="visible" />
        <motion.line x1={positions.hito.cx} y1={positions.hito.cy - 45} x2={positions.ruta.cx} y2={positions.ruta.cy + 45} stroke="#10B981" strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#arrowhead)" custom={3} variants={drawLine} initial="hidden" animate="visible" />

        {/* 1. Ruta */}
        <motion.g custom={0} variants={nodeAnimation} initial="hidden" animate="visible" onClick={() => handleNodeClick('ruta')} className="cursor-pointer group">
          <polygon points="100,70 140,110 100,150 60,110" fill="#0F172A" stroke="#ffffff" strokeWidth="4" className="drop-shadow-md group-hover:stroke-primary transition-colors" />
          <text x={100} y={55} textAnchor="middle" className="font-label-mono-sm fill-[#0F172A] text-[13px] font-bold uppercase tracking-wider group-hover:fill-primary transition-colors">{positions.ruta.label}</text>
        </motion.g>

        {/* 2. Módulo */}
        <motion.g custom={1} variants={nodeAnimation} initial="hidden" animate="visible" onClick={() => handleNodeClick('modulo')} className="cursor-pointer group">
          <rect x={265} y={75} width={70} height={70} rx={14} fill="#334155" stroke="#ffffff" strokeWidth="4" className="drop-shadow-md group-hover:stroke-primary transition-colors" />
          <text x={300} y={55} textAnchor="middle" className="font-label-mono-sm fill-[#0F172A] text-[13px] font-bold uppercase tracking-wider group-hover:fill-primary transition-colors">{positions.modulo.label}</text>
        </motion.g>

        {/* 3. Paso */}
        <motion.g custom={2} variants={nodeAnimation} initial="hidden" animate="visible" onClick={() => handleNodeClick('paso')} className="cursor-pointer group">
          <circle cx={300} cy={290} r={36} fill="#475569" stroke="#ffffff" strokeWidth="4" className="drop-shadow-md group-hover:stroke-primary transition-colors" />
          <text x={300} y={350} textAnchor="middle" className="font-label-mono-sm fill-[#0F172A] text-[13px] font-bold uppercase tracking-wider group-hover:fill-primary transition-colors">{positions.paso.label}</text>
        </motion.g>

        {/* 4. Hito */}
        <motion.g custom={3} variants={nodeAnimation} initial="hidden" animate="visible" onClick={() => handleNodeClick('hito')} className="cursor-pointer group">
          <polygon points="100,252 133,271 133,309 100,328 67,309 67,271" fill="#10B981" stroke="#ffffff" strokeWidth="4" className="drop-shadow-md group-hover:stroke-primary transition-colors" />
          <text x={100} y={350} textAnchor="middle" className="font-label-mono-sm fill-[#0F172A] text-[13px] font-bold uppercase tracking-wider group-hover:fill-primary transition-colors">{positions.hito.label}</text>
        </motion.g>

      </svg>
    </div>
  );
}
