import { Handle, Position } from '@xyflow/react';
import { Flag } from 'lucide-react';
import { motion } from 'framer-motion';

export function NodoInicio() {
  return (
    <div className="relative flex flex-col items-center justify-start group w-[120px]">
      <div className="relative w-[60px] h-[60px] flex items-center justify-center shrink-0">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white shadow-md border-4 border-surface relative z-10"
        >
          <Flag className="w-6 h-6" />
        </motion.div>
      </div>
      
      <div className="mt-2 text-center">
        <h3 className="font-label-md text-xs font-bold leading-tight text-primary uppercase">
          Inicio
        </h3>
      </div>

      <Handle type="source" position={Position.Right} id="right-source" className="opacity-0" />
      <Handle type="source" position={Position.Bottom} id="bottom-source" className="opacity-0" />
      <Handle type="source" position={Position.Left} id="left-source" className="opacity-0" />
      <Handle type="source" position={Position.Top} id="top-source" className="opacity-0" />
    </div>
  );
}
