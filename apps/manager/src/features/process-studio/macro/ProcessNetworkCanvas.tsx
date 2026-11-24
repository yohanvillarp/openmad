import React, { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  BackgroundVariant,
  type Connection,
  type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Play, Plus, Zap } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { ProcessCardNode } from './ProcessCardNode';
import { StartPrereqNode, FinalResolutionNode } from './TerminalNodes';
import { getInitialMacroNodes, getInitialMacroEdges } from './networkLayout';

interface ProcessNetworkCanvasProps {
  onOpenProcessBuilder: (id: string) => void;
}

export const ProcessNetworkCanvas: React.FC<ProcessNetworkCanvasProps> = ({
  onOpenProcessBuilder,
}) => {
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const nodeTypes = useMemo(
    () => ({
      processNode: ProcessCardNode,
      startNode: StartPrereqNode,
      goalNode: FinalResolutionNode,
    }),
    []
  );

  const initialNodes = useMemo(
    () => getInitialMacroNodes(onOpenProcessBuilder),
    [onOpenProcessBuilder]
  );
  const initialEdges = useMemo(() => getInitialMacroEdges(), []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: '#00e5ff', strokeWidth: 3 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#00e5ff' },
          },
          eds
        )
      ),
    [setEdges]
  );

  const handleAddNewProcess = () => {
    const newId = `proc-${Date.now()}`;
    const newNode: Node = {
      id: newId,
      type: 'processNode',
      position: { x: 450 + Math.random() * 100, y: 150 + Math.random() * 80 },
      data: {
        id: newId,
        title: 'Nuevo Trámite Universitario',
        category: 'Académico',
        stepsCount: 1,
        totalCost: 'S/. 10.00',
        driveDocs: 1,
        faculty: 'UNAMAD',
        status: 'draft',
        onOpenBuilder: onOpenProcessBuilder,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleRunSignal = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 2400);
  };

  return (
    <div className="relative w-full h-full flex-1 rounded-2xl bg-[#060a12] border border-cyan-500/25 overflow-hidden shadow-2xl">
      {/* Floating Macro HUD */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-black/80 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-xl font-mono text-xs">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse ml-1" />
        <span className="text-white font-bold">Red Universitaria UNAMAD:</span>
        <span className="text-cyan-300 font-semibold">{nodes.length} Procesos Conectados</span>
      </div>

      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleRunSignal}
          icon={<Play className={`w-3.5 h-3.5 ${isSimulating ? 'text-emerald-400 animate-spin' : ''}`} />}
        >
          {isSimulating ? 'Transmitiendo...' : 'Simular Red'}
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleAddNewProcess}
          icon={<Plus className="w-3.5 h-3.5" />}
        >
          + Trámite
        </Button>
      </div>

      {isSimulating && (
        <div className="absolute top-14 right-3 z-10 bg-emerald-950/90 border border-emerald-400 text-emerald-200 text-[11px] font-mono px-3 py-1 rounded-xl shadow-xl flex items-center gap-1.5 animate-bounce">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Validando requisitos previos en cadena académica...</span>
        </div>
      )}

      {/* Main Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-[#060a12]"
      >
        <Background color="#00e5ff" gap={28} size={1} variant={BackgroundVariant.Dots} />
        <Controls className="!bg-black/80 !border !border-white/20 !rounded-xl overflow-hidden [&>button]:!bg-transparent [&>button]:!border-white/10 [&>button]:!text-white" />
        <MiniMap
          nodeStrokeColor="#00e5ff"
          nodeColor="#0a1526"
          maskColor="rgba(0, 0, 0, 0.75)"
          className="!bg-black/90 !border !border-cyan-500/30 !rounded-xl overflow-hidden"
        />
      </ReactFlow>
    </div>
  );
};
