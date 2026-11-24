import { Handle, Position } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';
import { motion } from 'framer-motion';
import type { Tramite } from '@entities/tramite';
import { NodeShapes } from './NodeShapes';

export function NodoModulo({ data }: NodeProps<Node<Tramite, 'modulo'>>) {
  const isAvailable = data.estado === 'AVAILABLE';
  const isCompleted = data.estado === 'COMPLETED';
  const isInProgress = data.estado === 'IN_PROGRESS';
  const isLocked = data.estado === 'LOCKED';

  let fill = '#475569';
  let stroke = '#cbd5e1';
  let strokeWidth = '4';

  if (isCompleted) {
    fill = '#10B981';
    stroke = '#ffffff';
  } else if (isInProgress) {
    fill = '#f59e0b';
    stroke = '#ffffff';
  } else if (isAvailable) {
    fill = '#475569';
    stroke = '#10B981';
  }

  const nodeAnimation = isInProgress
    ? { y: [0, -4, 0], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } }
    : {};

  const pulseAnimation = isAvailable
    ? { scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5], transition: { repeat: Infinity, duration: 1.5 } }
    : {};

  const Shape = NodeShapes.modulo;

  return (
    <div className={`relative flex flex-col items-center justify-start group w-[120px] ${isLocked ? 'opacity-50 grayscale' : ''}`}>
      <Handle type="target" position={Position.Left} id="left-target" className="opacity-0" />
      <Handle type="source" position={Position.Right} id="right-source" className="opacity-0" />
      <Handle type="target" position={Position.Right} id="right-target" className="opacity-0" />
      <Handle type="source" position={Position.Left} id="left-source" className="opacity-0" />
      <Handle type="target" position={Position.Top} id="top" className="opacity-0" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="opacity-0" />
      
      <div className="relative w-[60px] h-[60px] flex items-center justify-center shrink-0">
        {isAvailable && (
          <motion.div
            animate={pulseAnimation}
            className="absolute inset-[-4px] rounded-[16px] border-2 border-primary"
          />
        )}
        
        <motion.div animate={nodeAnimation} className="w-full h-full relative z-10">
          <Shape className="w-full h-full drop-shadow-md" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        </motion.div>
      </div>

      <div className="mt-2 text-center flex flex-col items-center gap-1">
        <h3 className={`font-label-md text-xs font-bold leading-tight ${isCompleted ? 'text-primary' : 'text-on-surface'}`}>
          {data.titulo}
        </h3>
        {data.costo !== undefined && (
          <div className="font-label-mono-sm text-[10px] uppercase text-on-surface-variant bg-surface-variant px-1.5 py-0.5 rounded-sm">
            S/. {data.costo.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
}
