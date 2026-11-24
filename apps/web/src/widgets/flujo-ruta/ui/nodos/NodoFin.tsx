import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export function NodoFin({ data }: NodeProps<Node<{ titulo?: string }>>) {
  return (
    <div className="relative flex flex-col items-center justify-start group w-[120px] cursor-pointer hover:scale-105 transition-transform duration-200">
      <Handle type="target" position={Position.Left} id="left-target" className="opacity-0" />
      <Handle type="target" position={Position.Top} id="top-target" className="opacity-0" />
      <Handle type="target" position={Position.Right} id="right-target" className="opacity-0" />
      <Handle type="target" position={Position.Bottom} id="bottom-target" className="opacity-0" />
      
      <div className="relative w-[60px] h-[60px] flex items-center justify-center shrink-0">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-full h-full rounded-full bg-amber-500 flex items-center justify-center text-white shadow-md border-4 border-surface relative z-10"
        >
          <Trophy className="w-6 h-6 relative z-10 mb-1" />
        </motion.div>
      </div>

      <div className="mt-2 text-center">
        <h3 className="font-label-md text-xs font-bold leading-tight text-amber-500 uppercase">
          {data?.titulo || 'Meta'}
        </h3>
      </div>
    </div>
  );
}
