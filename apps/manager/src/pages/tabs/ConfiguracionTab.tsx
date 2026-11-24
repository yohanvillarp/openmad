import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Palette,
  History,
  Copy,
  Check,
  Cpu,
  FileCode2,
  Sparkles,
  Download,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import type { ThemeColor } from '@/shared/ui/types';

interface ConfiguracionTabProps {
  currentColor: ThemeColor;
  onColorChange: (c: ThemeColor) => void;
}

export const ConfiguracionTab: React.FC<ConfiguracionTabProps> = ({
  currentColor,
  onColorChange,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [flags, setFlags] = useState({
    suneduSync: true,
    emailAlerts: true,
    digitalSignEnforce: true,
    maintenanceMode: false,
    debugTelemetry: false,
  });

  const toggleFlag = (key: keyof typeof flags) => {
    setFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const auditLogs = [
    {
      id: 'LOG-8819',
      actor: 'yohan.villar@unamad.edu.pe',
      action: 'UPDATE_PROCEDURE_COST',
      target: 'TUPA-014 (Grado de Bachiller)',
      time: 'Hace 4 minutos',
      ip: '190.237.45.12',
      status: 'success',
      icon: CheckCircle2,
    },
    {
      id: 'LOG-8818',
      actor: 'sistema.daemon@openmad.internal',
      action: 'SUNEDU_SYNC_BACHILLERES',
      target: 'Lote #48 - 42 diplomas sincronizados',
      time: 'Hace 38 minutos',
      ip: '10.0.4.15',
      status: 'success',
      icon: CheckCircle2,
    },
    {
      id: 'LOG-8817',
      actor: 'decanato.f-ing@unamad.edu.pe',
      action: 'APPROVE_EXPEDIENTE',
      target: 'EXP-2026-0885 (Convalidación)',
      time: 'Hace 2 horas',
      ip: '190.237.45.88',
      status: 'success',
      icon: CheckCircle2,
    },
    {
      id: 'LOG-8816',
      actor: 'sec.general@unamad.edu.pe',
      action: 'SECURITY_ROLE_REVOKED',
      target: 'Usuario ID: 1044 (Practicante)',
      time: 'Hace 5 horas',
      ip: '190.237.44.10',
      status: 'warning',
      icon: AlertTriangle,
    },
  ];

  const themeSnippets = [
    {
      title: 'Tokens de Color Dinámico',
      desc: 'Variables CSS en Tailwind v4 para fondos, bordes y acentos:',
      code: `bg-[var(--accent-base)] text-[var(--accent-contrast)]
border-[var(--accent-border)] shadow-[var(--accent-glow)]`,
    },
    {
      title: 'Tipografía Configurada (@theme)',
      desc: 'Outfit para títulos de impacto, Plus Jakarta para lectura técnica:',
      code: `font-display (Outfit - 700/800)
font-sans (Plus Jakarta Sans - 400/500/600)
font-mono (JetBrains Mono - Códigos/TUPA)`,
    },
    {
      title: 'Superficie Híbrida Activa',
      desc: 'Combinación por defecto de biseles Tactical HUD y resplandor Cyber-Glow:',
      code: `.om-card {
  clip-path: polygon(0 0, calc(100% - 12px) 0, ...);
  box-shadow: 0 0 25px -5px var(--accent-glow);
}`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Live Theme Customizer inside Settings */}
      <Card
        title="Control de Tema & Aspecto Visual en Caliente"
        subtitle="Alterna el esquema cromático para previsualizar al instante en todo el sistema"
        badge={
          <Badge variant="accent" size="sm">
            <Sparkles className="w-3 h-3" />
            {currentColor.toUpperCase()}
          </Badge>
        }
      >
        <div className="space-y-5">
          <div>
            <label className="text-xs font-bold text-[var(--text-muted)] om-font-mono uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[var(--accent-base)]" />
              Esquema Cromático (5 Colorways):
            </label>
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: 'red', label: 'Rojo (Carmesí Flame)', dot: 'bg-[#ff2a5f]' },
                { id: 'blue', label: 'Azul (Cyber Cyan)', dot: 'bg-[#00d2ff]' },
                { id: 'green', label: 'Verde (Matrix Emerald)', dot: 'bg-[#10b981]' },
                { id: 'white', label: 'Blanco (Silver Frost)', dot: 'bg-white border border-slate-400' },
                { id: 'black', label: 'Negro (Pitch Onyx)', dot: 'bg-black border border-zinc-600' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onColorChange(c.id as ThemeColor)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    currentColor === c.id
                      ? 'bg-[var(--accent-base)] text-[var(--accent-contrast)] shadow-lg shadow-[var(--accent-glow)] scale-102'
                      : 'bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-subtle)]'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${c.dot}`} />
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Code Tokens Reusability Guide */}
      <Card
        title="Guía de Reutilización del Sistema de Diseño"
        subtitle="Tokens CSS y clases de utilidad configuradas en Tailwind v4 para extender en cualquier app de OpenMAD"
        badge={
          <Badge variant="accent" size="sm">
            <FileCode2 className="w-3 h-3" />
            Tailwind v4 + @theme
          </Badge>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {themeSnippets.map((s, index) => (
            <div
              key={s.title}
              className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="font-bold text-[var(--accent-base)] block om-font-mono text-xs">
                  {s.title}
                </span>
                <p className="text-[var(--text-muted)] text-[11px] mt-1">{s.desc}</p>
              </div>

              <div className="relative">
                <pre className="p-3 rounded-lg bg-black/50 text-[10.5px] om-font-mono text-[var(--text-main)] overflow-x-auto border border-white/5">
                  {s.code}
                </pre>
                <button
                  type="button"
                  onClick={() => handleCopy(s.code, index)}
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-[var(--bg-surface)] text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors cursor-pointer border border-[var(--border-subtle)]"
                  title="Copiar código"
                >
                  {copiedIndex === index ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Feature Flags & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title="Parámetros Globales del Sistema"
          subtitle="Comportamiento del motor de trámites y validación"
          badge={
            <Badge variant="neutral" size="sm">
              <Cpu className="w-3 h-3" />
              Runtime Config
            </Badge>
          }
        >
          <div className="space-y-3">
            {[
              {
                id: 'suneduSync',
                name: 'Sincronización Automática con SUNEDU',
                desc: 'Envío de lotes de diplomas y títulos aprobados en tiempo real',
              },
              {
                id: 'digitalSignEnforce',
                name: 'Firma Digital Obligatoria (PKI / DNIe)',
                desc: 'Exige certificado digital a decanos y secretaría general',
              },
              {
                id: 'emailAlerts',
                name: 'Notificaciones SMS / Email al Alumno',
                desc: 'Alerta instantánea ante cambios de estado u observaciones',
              },
              {
                id: 'maintenanceMode',
                name: 'Modo Mantenimiento en Ventanilla',
                desc: 'Bloquea nuevas solicitudes pero permite resolver pendientes',
              },
            ].map((f) => {
              const checked = flags[f.id as keyof typeof flags];
              return (
                <div
                  key={f.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] transition-colors"
                >
                  <div className="pr-4">
                    <div className="text-xs font-bold text-[var(--text-main)]">
                      {f.name}
                    </div>
                    <div className="text-[11px] text-[var(--text-dim)] mt-0.5">{f.desc}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFlag(f.id as keyof typeof flags)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      checked ? 'bg-[var(--accent-base)]' : 'bg-slate-700'
                    }`}
                  >
                    <motion.span
                      layout
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 ${
                        checked ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Audit Trail Log */}
        <Card
          title="Bitácora de Auditoría en Vivo"
          subtitle="Trazabilidad inmutable de acciones en OpenMAD"
          badge={
            <Badge variant="neutral" size="sm">
              <History className="w-3 h-3" />
              Inmutable
            </Badge>
          }
        >
          <div className="space-y-3">
            {auditLogs.map((log) => {
              const LogIcon = log.icon;
              return (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs space-y-1.5 hover:border-[var(--border-hover)] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <LogIcon className={`w-3.5 h-3.5 ${log.status === 'success' ? 'text-emerald-400' : 'text-amber-400'}`} />
                      <span className="font-bold om-font-mono text-[var(--accent-base)] text-[11px]">
                        {log.action}
                      </span>
                    </div>
                    <span className="text-[10px] text-[var(--text-dim)] om-font-mono">{log.time}</span>
                  </div>
                  <div className="text-[var(--text-main)] font-semibold">{log.target}</div>
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-dim)] om-font-mono pt-1">
                    <span>{log.actor}</span>
                    <span>IP: {log.ip}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)]">
            <Button variant="secondary" size="sm" className="w-full" icon={<Download className="w-3.5 h-3.5" />}>
              Exportar Registro de Auditoría (CSV / JSON)
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
