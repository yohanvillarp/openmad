import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { MascotMood, MascotConfig } from './types';

const DEFAULT_DIALOGUES: Record<MascotMood, string> = {
  happy: '¡Hola! Bienvenido al portal de OpenMad, hecho por y para estudiantes.',
  thinking: 'Revisando normativas y plazos de tu escuela profesional...',
  secure: '¡Modo protegido! Tus datos personales están a salvo 🔒',
  excited: '¡Excelente avance! Cada paso completado suma XP a tu perfil ★',
  sleeping: 'Zzz... Tomando una siesta mientras no hay actividad en ventanilla...',
};

export function useMascot(config: MascotConfig = {}) {
  const { sleepTimeoutMs = 15000, dialogues = {}, enableAutoSleep = true } = config;

  const mergedDialogues = useMemo(
    () => ({ ...DEFAULT_DIALOGUES, ...dialogues }),
    [dialogues]
  );

  const [mood, setMood] = useState<MascotMood>('happy');
  const [speech, setSpeech] = useState<string>(mergedDialogues.happy);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInteractingRef = useRef<boolean>(false);

  const updateMood = useCallback(
    (newMood: MascotMood, customMessage?: string) => {
      setMood(newMood);
      setSpeech(customMessage || mergedDialogues[newMood]);
    },
    [mergedDialogues]
  );

  const resetIdleTimer = useCallback(() => {
    if (!enableAutoSleep) return;

    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    if (mood === 'sleeping' && !isInteractingRef.current) {
      updateMood('happy');
    }

    idleTimerRef.current = setTimeout(() => {
      if (!isInteractingRef.current) {
        updateMood('sleeping');
      }
    }, sleepTimeoutMs);
  }, [enableAutoSleep, mood, sleepTimeoutMs, updateMood]);

  useEffect(() => {
    if (!enableAutoSleep) return;

    const handleUserActivity = () => {
      resetIdleTimer();
    };

    window.addEventListener('mousemove', handleUserActivity, { passive: true });
    window.addEventListener('keydown', handleUserActivity, { passive: true });
    window.addEventListener('click', handleUserActivity, { passive: true });

    resetIdleTimer();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
    };
  }, [enableAutoSleep, resetIdleTimer]);

  const onHoverMascot = useCallback(() => {
    if (mood !== 'secure') {
      updateMood('excited', '¡Hola! Soy Madbot. Te ayudo a navegar tus trámites universitarios.');
    }
  }, [mood, updateMood]);

  const onLeaveMascot = useCallback(() => {
    if (mood === 'excited') {
      updateMood('happy');
      resetIdleTimer();
    }
  }, [mood, resetIdleTimer, updateMood]);

  return {
    mood,
    speech,
    updateMood,
    onHoverMascot,
    onLeaveMascot,
    resetIdleTimer,
  };
}
