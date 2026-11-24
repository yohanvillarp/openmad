import { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { NodoRuta, NodoModulo, NodoPaso, NodoHito, NodoInicio, NodoFin } from './nodos';
import { initialNodes, initialEdges, bachilleratoNodes, bachilleratoEdges } from '../mocks';

const nodeTypes = {
  ruta: NodoRuta,
  modulo: NodoModulo,
  paso: NodoPaso,
  hito: NodoHito,
  inicio: NodoInicio,
  fin: NodoFin,
};

export function FlujoRuta() {
  const [activeGraph, setActiveGraph] = useState<'macro' | 'bachillerato'>('macro');
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    if (activeGraph === 'macro') {
      setNodes(initialNodes);
      setEdges(initialEdges);
    } else if (activeGraph === 'bachillerato') {
      setNodes(bachilleratoNodes);
      setEdges(bachilleratoEdges);
    }
  }, [activeGraph, setNodes, setEdges]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    if (activeGraph === 'macro' && node.id === 'r2') {
      setActiveGraph('bachillerato');
    } else if (activeGraph === 'bachillerato' && node.id === 'b-end') {
      setActiveGraph('macro');
    }
  }, [activeGraph]);

  return (
    <div className="h-full w-full bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-md overflow-hidden relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.5 }}
        minZoom={0.5}
        maxZoom={1.5}
        className="bg-surface-container-lowest"
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={2} color="#cbd5e1" />
        <Controls className="fill-primary" showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
