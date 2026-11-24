import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Timer,
  GraduationCap,
  Users,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Activity,
  CheckCircle2,
  AlertTriangle,
  FilePlus2,
  BookOpen,
  ExternalLink,
} from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { StatCard } from '@/shared/ui/StatCard';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';

export const DashboardTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero Banner with Anime Cyber Edge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="om-card p-6 sm:p-8 relative overflow-hidden bg-gradient-to-r from-[var(--bg-surface)] via-[var(--bg-surface-elevated)] to-[var(--accent-subtle)] border border-[var(--border-subtle)]"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="accent" pulse size="sm">
                <Zap className="w-3 h-3" />
                COMUNIDAD ESTUDIANTIL ACTIVA
              </Badge>
              <span className="text-xs text-[var(--text-dim)] font-bold om-font-mono">
                DE ESTUDIANTES PARA ESTUDIANTES
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)] om-font-display">
              Panel de Guías & Trámites Estudiantiles
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-medium">
              Plataforma diseñada para centralizar, guiar y optimizar el acceso a la información sobre trámites académicos y administrativos para los estudiantes de la UNAMAD.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button variant="secondary" size="md" icon={<Activity className="w-4 h-4" />}>
              Ver Registro
            </Button>
            <Button variant="primary" size="md" icon={<FilePlus2 className="w-4 h-4" />}>
              + Nueva Guía de Trámite
            </Button>
          </div>
        </div>

        {/* Ambient background glow decoration */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[var(--accent-glow)] blur-3xl opacity-20 pointer-events-none" />
      </motion.div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Guías Documentadas"
          value="48"
          change="6 nuevas este ciclo"
          isPositive={true}
          caption="Grados, Títulos y Matrículas"
          icon={<FileText className="w-5 h-5" />}
        />
        <StatCard
          title="Tiempo Estimado"
          value="18.4 d"
          change="Promedio real verificado"
          isPositive={true}
          caption="Según experiencias de alumnos"
          icon={<Timer className="w-5 h-5" />}
        />
        <StatCard
          title="Estudiantes Ayudados"
          value="8,940+"
          change="8.1% vs anterior"
          isPositive={true}
          caption="Consultas en el portal web"
          icon={<GraduationCap className="w-5 h-5" />}
        />
        <StatCard
          title="Colaboradores"
          value="24"
          change="Activos"
          isPositive={true}
          caption="Editores de facultades UNAMAD"
          icon={<Users className="w-5 h-5" />}
        />
      </div>

      {/* Two Column Layout: Trámites Recientes & Fuentes Comunitarias */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recientes */}
        <div className="lg:col-span-2">
          <Card
            title="Guías de Trámites Más Consultadas"
            subtitle="Información paso a paso revisada y confirmada por la comunidad"
            badge={
              <Badge variant="neutral" size="sm">
                <Activity className="w-3.5 h-3.5 text-[var(--accent-base)]" />
                Actualizado 2026
              </Badge>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] text-xs text-[var(--text-muted)] font-bold uppercase om-font-mono">
                    <th className="pb-3.5 font-bold">Código</th>
                    <th className="pb-3.5 font-bold">Trámite Académico</th>
                    <th className="pb-3.5 font-bold">Facultad / Área</th>
                    <th className="pb-3.5 font-bold">Estado Guía</th>
                    <th className="pb-3.5 font-bold text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {[
                    {
                      id: 'TUPA-014',
                      proc: 'Grado Académico de Bachiller',
                      career: 'Ing. de Sistemas / Todas las Carreras',
                      status: 'Guía Verificada',
                      badge: 'success',
                      icon: CheckCircle2,
                    },
                    {
                      id: 'TUPA-018',
                      proc: 'Título Profesional (Tesis)',
                      career: 'Decanato & Facultades',
                      status: 'Revisión Comunitaria',
                      badge: 'warning',
                      icon: AlertTriangle,
                    },
                    {
                      id: 'TUPA-005',
                      proc: 'Certificado Oficial de Estudios',
                      career: 'Dirección Académica',
                      status: 'Guía Verificada',
                      badge: 'success',
                      icon: CheckCircle2,
                    },
                    {
                      id: 'TUPA-022',
                      proc: 'Convalidación de Asignaturas',
                      career: 'Comisión Curricular',
                      status: 'En Actualización',
                      badge: 'accent',
                      icon: Activity,
                    },
                  ].map((item) => {
                    const StatusIcon = item.icon;
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-[var(--bg-surface-elevated)] transition-colors group"
                      >
                        <td className="py-3.5 font-bold om-font-mono text-xs text-[var(--accent-base)]">
                          {item.id}
                        </td>
                        <td className="py-3.5">
                          <div className="font-bold text-[var(--text-main)]">{item.proc}</div>
                        </td>
                        <td className="py-3.5 text-xs text-[var(--text-muted)] font-medium">{item.career}</td>
                        <td className="py-3.5">
                          <Badge variant={item.badge as any} size="sm">
                            <StatusIcon className="w-3 h-3" />
                            {item.status}
                          </Badge>
                        </td>
                        <td className="py-3.5 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                          >
                            Ver Pasos
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Fuentes Comunitarias */}
        <div>
          <Card
            title="Fuentes de Información"
            subtitle="Recursos y canales de consulta verificados"
            badge={
              <Badge variant="success" pulse size="sm">
                ACTIVO
              </Badge>
            }
          >
            <div className="space-y-3">
              {[
                { name: 'Portal de Alumnos UNAMAD', status: 'Enlace Oficial', icon: BookOpen },
                { name: 'Catálogo de Requisitos TUPA', status: 'Verificado 2026', icon: ShieldCheck },
                { name: 'Formularios FUT Descargables', status: 'Plantillas PDF', icon: FileText },
                { name: 'Directorio de Decanatos', status: 'Contactos y Horarios', icon: Users },
                { name: 'Comunidad Estudiantil GitHub', status: 'Código Abierto', icon: Zap },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.name}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[var(--text-main)]">{s.name}</div>
                        <div className="text-[11px] text-[var(--text-dim)] font-medium om-font-mono">{s.status}</div>
                      </div>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-[var(--border-subtle)]">
              <a
                href="https://github.com/yohanvillarp/openmad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-main)] hover:border-[var(--accent-base)] hover:text-[var(--accent-base)] transition-colors"
              >
                <img src="/assets/github.svg" alt="" className="w-4 h-4" />
                Contribuir en GitHub
                <ExternalLink className="w-3 h-3 text-[var(--text-dim)]" />
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
