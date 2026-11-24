import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Briefcase,
  Bot,
  Send,
  CheckCircle2,
  Building,
  Mail,
  User,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/shared/ui/Button';

export type ContributorRole = 'estudiante' | 'docente' | 'madbot';

interface RequestAccessFormProps {
  onSuccessSubmit: (role: ContributorRole) => void;
  onFocusField?: (type: 'email' | 'text' | 'message') => void;
  onBlurField?: () => void;
}

const UNAMAD_FACULTIES_WITH_CAREERS = [
  {
    id: 'f-ing',
    name: 'Facultad de Ingeniería',
    careers: [
      'Ingeniería de Sistemas e Informática',
      'Ingeniería Forestal y Medio Ambiente',
      'Ingeniería Agroindustrial',
    ],
  },
  {
    id: 'f-eco',
    name: 'Facultad de Ecoturismo y Negocios',
    careers: [
      'Licenciatura en Ecoturismo',
      'Administración y Negocios Internacionales',
      'Contabilidad y Finanzas',
    ],
  },
  {
    id: 'f-edu',
    name: 'Facultad de Educación y Humanidades',
    careers: [
      'Educación Primaria e Informática',
      'Educación Inicial y Especial',
      'Derecho y Ciencias Políticas',
      'Enfermería y Ciencias de la Salud',
    ],
  },
];

export const RequestAccessForm: React.FC<RequestAccessFormProps> = ({
  onSuccessSubmit,
  onFocusField,
  onBlurField,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<ContributorRole>('estudiante');
  const [faculty, setFaculty] = useState(UNAMAD_FACULTIES_WITH_CAREERS[0].name);
  const [career, setCareer] = useState(UNAMAD_FACULTIES_WITH_CAREERS[0].careers[0]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const activeFacultyObj =
    UNAMAD_FACULTIES_WITH_CAREERS.find((f) => f.name === faculty) ||
    UNAMAD_FACULTIES_WITH_CAREERS[0];

  const handleFacultyChange = (newFac: string) => {
    setFaculty(newFac);
    const facObj = UNAMAD_FACULTIES_WITH_CAREERS.find((f) => f.name === newFac);
    if (facObj && facObj.careers.length > 0) {
      setCareer(facObj.careers[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      onSuccessSubmit(selectedRole);
    }, 800);
  };

  if (isSent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 rounded-xl bg-[var(--bg-surface-elevated)] border border-emerald-500/30 text-center space-y-3"
      >
        <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <h3 className="text-base font-bold text-[var(--text-main)] om-font-display">
          ¡Solicitud Enviada!
        </h3>
        <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto leading-relaxed">
          Revisaremos tu postulación como <strong>{selectedRole.toUpperCase()}</strong> y te responderemos a tu correo institucional.
        </p>
        <div className="pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsSent(false);
              setMessage('');
            }}
          >
            Nueva solicitud
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {/* Compact Segmented Role Selector */}
      <div>
        <label className="text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider block mb-1.5 om-font-mono">
          Rol:
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
          {[
            { id: 'estudiante' as ContributorRole, label: 'Estudiante', icon: GraduationCap },
            { id: 'docente' as ContributorRole, label: 'Docente', icon: Briefcase },
            { id: 'madbot' as ContributorRole, label: 'MadBot', icon: Bot },
          ].map((r) => {
            const Icon = r.icon;
            const isSelected = selectedRole === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRole(r.id)}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-semibold cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[var(--accent-base)] text-[var(--accent-contrast)] shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Name and Email side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div>
          <label className="text-[11px] font-semibold text-[var(--text-muted)] block mb-1">
            Nombre:
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => onFocusField?.('text')}
              onBlur={onBlurField}
              placeholder="Yohan Villar"
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none focus:border-[var(--accent-base)] transition-colors"
            />
            <User className="w-3.5 h-3.5 absolute left-2.5 top-2 text-[var(--text-dim)]" />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-[var(--text-muted)] block mb-1">
            Correo UNAMAD:
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => onFocusField?.('email')}
              onBlur={onBlurField}
              placeholder="usuario@unamad.edu.pe"
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none focus:border-[var(--accent-base)] transition-colors"
            />
            <Mail className="w-3.5 h-3.5 absolute left-2.5 top-2 text-[var(--text-dim)]" />
          </div>
        </div>
      </div>

      {/* Faculty & Career side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div>
          <label className="text-[11px] font-semibold text-[var(--text-muted)] block mb-1">
            Facultad:
          </label>
          <div className="relative">
            <select
              value={faculty}
              onChange={(e) => handleFacultyChange(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-base)] transition-colors cursor-pointer"
            >
              {UNAMAD_FACULTIES_WITH_CAREERS.map((f) => (
                <option key={f.id} value={f.name} className="bg-[var(--bg-surface)] text-[var(--text-main)]">
                  {f.name}
                </option>
              ))}
            </select>
            <Building className="w-3.5 h-3.5 absolute left-2.5 top-2 text-[var(--text-dim)] pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-[var(--text-muted)] block mb-1">
            Carrera:
          </label>
          <div className="relative">
            <select
              value={career}
              onChange={(e) => setCareer(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-base)] transition-colors cursor-pointer"
            >
              {activeFacultyObj.careers.map((c) => (
                <option key={c} value={c} className="bg-[var(--bg-surface)] text-[var(--text-main)]">
                  {c}
                </option>
              ))}
            </select>
            <GraduationCap className="w-3.5 h-3.5 absolute left-2.5 top-2 text-[var(--text-dim)] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Compact Message */}
      <div>
        <label className="text-[11px] font-semibold text-[var(--text-muted)] block mb-1">
          Mensaje (¿en qué te gustaría colaborar?):
        </label>
        <div className="relative">
          <textarea
            required
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => onFocusField?.('message')}
            onBlur={onBlurField}
            placeholder="Ej: Quiero documentar trámites de titulación y prácticas pre-profesionales..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none focus:border-[var(--accent-base)] transition-colors resize-none"
          />
          <MessageSquare className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[var(--text-dim)]" />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={isSubmitting}
        className="w-full justify-center shadow-md shadow-[var(--accent-glow)] text-xs font-bold py-2 mt-1"
        icon={
          isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
              className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )
        }
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
      </Button>
    </form>
  );
};
