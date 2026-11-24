import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  Lock,
  Play,
  RotateCcw,
  DollarSign,
  FileText,
  ExternalLink,
  Zap,
  Trophy,
  Award,
  Plus,
  Trash2,
  Pencil,
  Compass,
  Flame,
} from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { Mascot } from '@/shared/ui/Mascot';

export type NodeRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface SkillNode {
  id: string;
  title: string;
  stage: string;
  desc: string;
  rarity: NodeRarity;
  xpReward: number;
  cost?: string;
  docUrl?: string;
  location?: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  requiredParentId?: string;
  x: number; // percentage in tree canvas (0-100)
  y: number; // percentage in tree canvas (0-100)
}

const INITIAL_SKILL_TREE: SkillNode[] = [
  {
    id: 'node-1',
    title: 'Créditos Aprobados',
    stage: 'Fase 0: Requisito Previo',
    desc: 'Verifica tener el mínimo de créditos de tu carrera (130 Forestal, 147 Agroindustrial, 140 Sistemas).',
    rarity: 'common',
    xpReward: 50,
    location: 'Sistema Académico UNAMAD',
    isUnlocked: true,
    isCompleted: true,
    x: 8,
    y: 50,
  },
  {
    id: 'node-2',
    title: 'Ficha de Autorización',
    stage: 'Fase 1: Trámite Inicial',
    desc: 'Descarga e imprime la ficha de autorización editable para presentar en secretaría.',
    rarity: 'rare',
    xpReward: 120,
    docUrl: 'https://docs.google.com/document/d/1IXkJkT6HeTQtV7uQXfmR3J7UpD_jNBEZ/edit',
    location: 'Coordinación de Carrera',
    isUnlocked: true,
    isCompleted: false,
    requiredParentId: 'node-1',
    x: 28,
    y: 28,
  },
  {
    id: 'node-3',
    title: 'Pago en Caja (S/. 16)',
    stage: 'Fase 1: Aranceles BN',
    desc: 'Paga S/. 10 (Cód. 464) para carta y S/. 6 (Cód. 053) para récord académico en ventanilla.',
    rarity: 'rare',
    xpReward: 150,
    cost: 'S/. 16.00',
    location: 'Caja UNAMAD / Banco de la Nación',
    isUnlocked: true,
    isCompleted: false,
    requiredParentId: 'node-1',
    x: 28,
    y: 72,
  },
  {
    id: 'node-4',
    title: 'Carta de Presentación',
    stage: 'Fase 2: Mesa de Partes',
    desc: 'Entrega los vouchers y la ficha en la Facultad de Ingeniería para recoger tu carta oficial sellada.',
    rarity: 'epic',
    xpReward: 250,
    location: 'Secretaría de Facultad',
    isUnlocked: false,
    isCompleted: false,
    requiredParentId: 'node-2',
    x: 52,
    y: 50,
  },
  {
    id: 'node-5',
    title: 'Convenio y Carta de Aceptación',
    stage: 'Fase 3: Entidad Receptora',
    desc: 'Presenta el Anexo 03 ante la empresa o institución y obtén tu carta de aceptación (Anexo 02).',
    rarity: 'epic',
    xpReward: 350,
    docUrl: 'https://drive.google.com/file/d/1wqWnJEmqdSepC4u50-_RkES4GkDAodpu/view',
    location: 'Empresa / Institución Aliada',
    isUnlocked: false,
    isCompleted: false,
    requiredParentId: 'node-4',
    x: 74,
    y: 50,
  },
  {
    id: 'node-6',
    title: 'Boss Final: Sustentación e Informe',
    stage: 'Fase Final: Misión Cumplida ★',
    desc: 'Redacta el informe final con los anexos 01 y 02, programa jurado calificador y aprueba tus prácticas.',
    rarity: 'legendary',
    xpReward: 1000,
    location: 'Auditorio / Decanato',
    isUnlocked: false,
    isCompleted: false,
    requiredParentId: 'node-5',
    x: 93,
    y: 50,
  },
];

const RARITY_THEMES: Record<
  NodeRarity,
  {
    border: string;
    glow: string;
    bg: string;
    badge: string;
    tag: string;
  }
> = {
  common: {
    border: 'border-slate-400',
    glow: 'rgba(148, 163, 184, 0.4)',
    bg: 'from-slate-800 to-slate-900',
    badge: 'bg-slate-800 text-slate-300 border-slate-600',
    tag: 'Común',
  },
  rare: {
    border: 'border-sky-400',
    glow: 'rgba(56, 189, 248, 0.5)',
    bg: 'from-sky-950 to-blue-900',
    badge: 'bg-sky-950 text-sky-300 border-sky-500',
    tag: 'Raro',
  },
  epic: {
    border: 'border-purple-400',
    glow: 'rgba(192, 132, 252, 0.6)',
    bg: 'from-purple-950 to-indigo-950',
    badge: 'bg-purple-950 text-purple-300 border-purple-500',
    tag: 'Épico',
  },
  legendary: {
    border: 'border-amber-400',
    glow: 'rgba(251, 191, 36, 0.8)',
    bg: 'from-amber-950 via-yellow-900 to-amber-900',
    badge: 'bg-amber-950 text-yellow-300 border-yellow-400',
    tag: 'Legendario ★',
  },
};

export const SkillTreeBuilder: React.FC = () => {
  const [nodes, setNodes] = useState<SkillNode[]>(INITIAL_SKILL_TREE);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-2');
  const [viewMode, setViewMode] = useState<'quest' | 'editor'>('quest');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  // Calculate XP & Player Stats
  const completedNodes = nodes.filter((n) => n.isCompleted);
  const totalXp = completedNodes.reduce((acc, curr) => acc + curr.xpReward, 0);
  const playerLevel = Math.floor(totalXp / 250) + 1;
  const progressPercent = Math.round((completedNodes.length / nodes.length) * 100);

  // Complete a quest node
  const handleCompleteNode = (id: string) => {
    setNodes((prev) => {
      const target = prev.find((n) => n.id === id);
      if (target?.rarity === 'legendary') {
        confetti({
          particleCount: 160,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#fbbf24', '#f59e0b', '#00e5ff', '#ff0055'],
        });
      }

      const updated = prev.map((n) => (n.id === id ? { ...n, isCompleted: true } : n));
      // Unlock all children
      return updated.map((n) => {
        if (n.requiredParentId === id) {
          return { ...n, isUnlocked: true };
        }
        return n;
      });
    });
  };

  // Reset Tree
  const handleResetTree = () => {
    setNodes(
      INITIAL_SKILL_TREE.map((n, i) => ({
        ...n,
        isCompleted: i === 0,
        isUnlocked: i === 0 || n.requiredParentId === 'node-1',
      }))
    );
  };

  // Node Editing
  const updateNodeField = (id: string, field: keyof SkillNode, value: unknown) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, [field]: value } : n))
    );
  };

  // Add child node
  const handleAddChildNode = () => {
    const newId = `node-${Date.now()}`;
    const parent = selectedNode;
    const newNode: SkillNode = {
      id: newId,
      title: `Sub-misión de ${parent.title}`,
      stage: 'Fase Intermedia',
      desc: 'Detalla los requerimientos o entrevistas para superar este nodo...',
      rarity: 'rare',
      xpReward: 100,
      isUnlocked: parent.isCompleted,
      isCompleted: false,
      requiredParentId: parent.id,
      x: Math.min(95, parent.x + 15),
      y: Math.max(15, Math.min(85, parent.y + 18)),
    };
    setNodes([...nodes, newNode]);
    setSelectedNodeId(newId);
  };

  // Delete node
  const handleDeleteNode = (id: string) => {
    if (nodes.length <= 1) return;
    setNodes(nodes.filter((n) => n.id !== id));
    setSelectedNodeId(nodes[0].id);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & RPG HUD */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent" size="sm">
              <Compass className="w-3.5 h-3.5" />
              Opción B • RPG Skill Tree & Quests
            </Badge>
            <span className="text-xs font-mono text-[var(--text-dim)]">
              // Mapa de Talentos y Misiones Estudiantiles
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-[var(--text-main)] mt-1 om-font-display">
            Árbol de Habilidades y Desafíos Universitarios
          </h2>
          <p className="text-xs text-[var(--text-dim)] mt-0.5">
            Convierte cualquier trámite en una aventura interactiva con niveles, energía neón y recompensas.
          </p>
        </div>

        {/* Player Stats Bar */}
        <div className="flex items-center gap-3">
          {/* Level Badge */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-transparent border border-yellow-500/40">
            <div className="w-8 h-8 rounded-lg bg-yellow-400 text-black font-black flex items-center justify-center font-mono text-sm shadow-md">
              L{playerLevel}
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-300 font-bold block uppercase tracking-wider">
                Nivel de Estudiante
              </span>
              <span className="text-xs font-black text-white font-mono flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-current" />
                {totalXp} XP Acumulados
              </span>
            </div>
          </div>

          {/* Mode Switch */}
          <div className="flex items-center rounded-xl bg-[var(--bg-surface-elevated)] p-1 border border-[var(--border-subtle)]">
            <button
              onClick={() => setViewMode('quest')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'quest'
                  ? 'bg-[var(--accent-base)] text-[var(--accent-contrast)] shadow-md'
                  : 'text-[var(--text-dim)] hover:text-[var(--text-main)]'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              Misión RPG
            </button>
            <button
              onClick={() => setViewMode('editor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'editor'
                  ? 'bg-[var(--accent-base)] text-[var(--accent-contrast)] shadow-md'
                  : 'text-[var(--text-dim)] hover:text-[var(--text-main)]'
              }`}
            >
              <Pencil className="w-3.5 h-3.5" />
              Editor del Árbol
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage: 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Massive Interactive Skill Tree Canvas (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-2xl bg-gradient-to-br from-[#070b14] via-[#0a1222] to-[#040810] border border-cyan-500/30 min-h-[580px] p-6 shadow-2xl overflow-hidden om-grid-pattern">
            {/* Top Canvas Controls */}
            <div className="absolute top-4 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 pointer-events-auto">
                <Badge variant="accent" size="sm" className="font-mono shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  Ruta Activa: Prácticas Pre-Profesionales
                </Badge>
                <span className="text-[11px] font-mono text-cyan-300/80 bg-black/60 px-2.5 py-1 rounded-full border border-cyan-500/20 backdrop-blur-md">
                  {completedNodes.length} de {nodes.length} Nodos Desbloqueados ({progressPercent}%)
                </span>
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                {viewMode === 'editor' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleAddChildNode}
                    icon={<Plus className="w-3.5 h-3.5" />}
                  >
                    Nueva Rama
                  </Button>
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleResetTree}
                  icon={<RotateCcw className="w-3.5 h-3.5" />}
                >
                  Reiniciar Árbol
                </Button>
              </div>
            </div>

            {/* Glowing SVG Connectors Between Nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <defs>
                <linearGradient id="neonCyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="neonGoldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="1" />
                </linearGradient>
              </defs>

              {nodes.map((node) => {
                if (!node.requiredParentId) return null;
                const parent = nodes.find((n) => n.id === node.requiredParentId);
                if (!parent) return null;

                const isPathActive = parent.isCompleted;

                // Bezier curve between parent and child
                const x1 = `${parent.x}%`;
                const y1 = `${parent.y}%`;
                const x2 = `${node.x}%`;
                const y2 = `${node.y}%`;

                return (
                  <g key={`cable-${parent.id}-${node.id}`}>
                    {/* Shadow ambient cable glow */}
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isPathActive ? 'rgba(0, 229, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)'}
                      strokeWidth={isPathActive ? 8 : 3}
                    />

                    {/* Main pulsing cable line */}
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isPathActive ? 'url(#neonCyanGlow)' : 'rgba(255, 255, 255, 0.15)'}
                      strokeWidth={isPathActive ? 3 : 1.5}
                      strokeDasharray={isPathActive ? '6 6' : undefined}
                      className={isPathActive ? 'animate-pulse' : ''}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Interactive Nodes Placed Absolutely on the Canvas */}
            <div className="absolute inset-0 z-20 p-6 pointer-events-none">
              {nodes.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const theme = RARITY_THEMES[node.rarity];

                return (
                  <motion.div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className={`absolute pointer-events-auto cursor-pointer flex flex-col items-center group select-none transition-shadow duration-200`}
                  >
                    {/* Node Core Badge / Orb */}
                    <div
                      className={`relative w-16 h-16 rounded-2xl flex items-center justify-center p-1 transition-all duration-300 ${
                        node.isCompleted
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-700 shadow-[0_0_25px_rgba(16,185,129,0.7)] border-2 border-emerald-300'
                          : node.isUnlocked
                          ? `bg-gradient-to-br ${theme.bg} border-2 ${theme.border} shadow-[0_0_20px_${theme.glow}]`
                          : 'bg-slate-900/90 border border-slate-700 opacity-60 grayscale'
                      } ${isSelected ? 'ring-4 ring-yellow-400 scale-110' : ''}`}
                    >
                      {/* Node Icon */}
                      {node.isCompleted ? (
                        <CheckCircle2 className="w-8 h-8 text-white" />
                      ) : !node.isUnlocked ? (
                        <Lock className="w-6 h-6 text-slate-500" />
                      ) : node.rarity === 'legendary' ? (
                        <Trophy className="w-8 h-8 text-yellow-300 animate-bounce" />
                      ) : node.cost ? (
                        <DollarSign className="w-7 h-7 text-amber-300" />
                      ) : node.docUrl ? (
                        <FileText className="w-7 h-7 text-purple-300" />
                      ) : (
                        <Zap className="w-7 h-7 text-sky-300" />
                      )}

                      {/* XP Badge Top-Right */}
                      <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-black/80 border border-yellow-400/40 text-[9px] font-mono font-bold text-yellow-300 shadow">
                        +{node.xpReward}
                      </span>
                    </div>

                    {/* Node Floating Label */}
                    <div className="mt-2 text-center max-w-[130px]">
                      <span
                        className={`text-xs font-black block tracking-tight truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                          isSelected
                            ? 'text-yellow-300 underline'
                            : node.isCompleted
                            ? 'text-emerald-300'
                            : node.isUnlocked
                            ? 'text-white'
                            : 'text-slate-500'
                        }`}
                      >
                        {node.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono block truncate">
                        {node.location || node.stage}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Progress Bar on Canvas */}
            <div className="absolute bottom-4 left-6 right-6 z-20 flex items-center justify-between text-xs font-mono text-[var(--text-dim)] bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>Rango Actual: Superviviente UNAMAD</span>
              </div>
              <div className="flex items-center gap-3">
                <span>Meta Final: Sustentación & Título Universitario</span>
                <span className="font-bold text-emerald-400">{progressPercent}% Listo</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Quest Inspector & NPC Mascot Guide (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Quest Node Details Card */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4 shadow-xl">
            {/* Header with Rarity Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                    RARITY_THEMES[selectedNode.rarity].badge
                  }`}
                >
                  {RARITY_THEMES[selectedNode.rarity].tag}
                </span>
                <span className="text-xs font-mono text-[var(--text-dim)]">
                  +{selectedNode.xpReward} XP
                </span>
              </div>

              {viewMode === 'editor' && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-1 rounded-md bg-[var(--bg-surface-elevated)] hover:bg-white/10 text-white transition-colors"
                    title="Editar misión"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteNode(selectedNode.id)}
                    className="p-1 rounded-md bg-[var(--bg-surface-elevated)] hover:bg-rose-950/80 text-rose-300 transition-colors"
                    title="Eliminar nodo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Node Title & Stage */}
            <div>
              <span className="text-xs font-mono text-[var(--text-dim)] block">
                {selectedNode.stage}
              </span>
              <h3 className="text-lg font-black text-[var(--text-main)] mt-0.5 om-font-display">
                {selectedNode.title}
              </h3>
            </div>

            {/* Editable or Static Description */}
            {isEditing && viewMode === 'editor' ? (
              <div className="space-y-3 p-3 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                <div>
                  <label className="text-[10px] font-mono text-[var(--text-dim)] block">
                    Título de la Misión
                  </label>
                  <input
                    type="text"
                    value={selectedNode.title}
                    onChange={(e) => updateNodeField(selectedNode.id, 'title', e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded px-2 py-1 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-[var(--text-dim)] block">
                    Instrucciones
                  </label>
                  <textarea
                    value={selectedNode.desc}
                    onChange={(e) => updateNodeField(selectedNode.id, 'desc', e.target.value)}
                    rows={3}
                    className="w-full bg-black/60 border border-white/20 rounded px-2 py-1 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-[var(--text-dim)] block">
                    Lugar en la UNAMAD
                  </label>
                  <input
                    type="text"
                    value={selectedNode.location || ''}
                    onChange={(e) => updateNodeField(selectedNode.id, 'location', e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded px-2 py-1 text-xs text-white"
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans">
                {selectedNode.desc}
              </p>
            )}

            {/* Badges / Requirements */}
            <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
              {selectedNode.location && (
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--text-dim)]">Ubicación</span>
                  <span className="font-bold text-[var(--text-main)]">
                    {selectedNode.location}
                  </span>
                </div>
              )}

              {selectedNode.cost && (
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--text-dim)]">Derecho de Pago</span>
                  <span className="font-bold text-amber-400">{selectedNode.cost}</span>
                </div>
              )}

              {selectedNode.docUrl && (
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--text-dim)]">Formato Requerido</span>
                  <a
                    href={selectedNode.docUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-300 hover:text-purple-200 underline flex items-center gap-1 font-bold"
                  >
                    Abrir en Drive
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Action Button: Complete Quest / Unlock */}
            <div className="pt-2">
              {selectedNode.isCompleted ? (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center gap-2 text-xs font-bold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ¡Misión Completada! (+{selectedNode.xpReward} XP)
                </div>
              ) : selectedNode.isUnlocked ? (
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => handleCompleteNode(selectedNode.id)}
                  icon={<Play className="w-4 h-4" />}
                >
                  Marcar Misión como Superada
                </Button>
              ) : (
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
                  <Lock className="w-4 h-4" />
                  Bloqueado: Completa el nodo anterior primero
                </div>
              )}
            </div>
          </div>

          {/* NPC Game Master: MadBot */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center gap-4 shadow-xl">
            <Mascot
              mood={
                selectedNode.isCompleted
                  ? 'excited'
                  : selectedNode.isUnlocked
                  ? 'happy'
                  : 'thinking'
              }
              size={80}
            />
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[var(--accent-base)] font-bold uppercase tracking-wider block">
                MadBot • Game Master UNAMAD
              </span>
              <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                {selectedNode.isCompleted
                  ? `¡Genial! Superaste "${selectedNode.title}". Los siguientes caminos del campus están abiertos.`
                  : selectedNode.isUnlocked
                  ? `Esta misión está activa en ${selectedNode.location || 'la facultad'}. ¡Revisa los requisitos y suma ${selectedNode.xpReward} XP!`
                  : 'Nodo bloqueado por requisitos previos. ¡Debes validar las fases anteriores!'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
