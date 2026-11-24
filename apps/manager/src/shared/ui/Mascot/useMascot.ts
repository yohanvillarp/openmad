import { useState, useEffect, useRef, useCallback } from 'react';
import type { MascotMood, MascotConfig } from './types';

const DEFAULT_DIALOGUES: Record<MascotMood, string> = {
  happy: '¡Hola! Bienvenido al portal de OpenMad, hecho por y para estudiantes.',
  thinking: 'Revisando datos de la comunidad estudiantil...',
  secure: '¡Modo protegido! Tu contraseña está a salvo y no miraré 🔒',
  excited: '¡Excelente! Gracias por sumar tu energía a la comunidad de OpenMad ★',
  sleeping: 'Zzz... Tomando una siesta mientras no hay actividad en ventanilla...',
};

export function useMascot(config: MascotConfig = {}) {
  const { sleepTimeoutMs = 15000, dialogues = {}, enableAutoSleep = true } = config;

  const mergedDialogues = { ...DEFAULT_DIALOGUES, ...dialogues };

  const [mood, setMood] = useState<MascotMood>('happy');
  const [speech, setSpeech] = useState<string>(mergedDialogues.happy);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInteractingRef = useRef<boolean>(false);

  // Set mood and corresponding speech
  const updateMood = useCallback(
    (newMood: MascotMood, customMessage?: string) => {
      setMood(newMood);
      setSpeech(customMessage || mergedDialogues[newMood]);
    },
    [mergedDialogues]
  );

  // Reset idle/sleep timer
  const resetIdleTimer = useCallback(() => {
    if (!enableAutoSleep) return;

    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    // Wake up if sleeping and not locked in interaction
    if (mood === 'sleeping' && !isInteractingRef.current) {
      updateMood('happy');
    }

    idleTimerRef.current = setTimeout(() => {
      if (!isInteractingRef.current) {
        updateMood('sleeping');
      }
    }, sleepTimeoutMs);
  }, [enableAutoSleep, mood, sleepTimeoutMs, updateMood]);

  // Global activity listener (mouse movement, clicks, key presses wake up the mascot)
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

  // Contextual triggers for forms & actions
  const onFocusInput = useCallback(
    (type: 'email' | 'password' | 'text' | 'message') => {
      isInteractingRef.current = true;
      if (type === 'password') {
        updateMood('secure');
      } else if (type === 'message') {
        updateMood('thinking', '¡Nos encanta leer cómo te gustaría aportar a OpenMad!');
      } else {
        updateMood('thinking');
      }
    },
    [updateMood]
  );

  const onBlurInput = useCallback(() => {
    isInteractingRef.current = false;
    updateMood('happy');
    resetIdleTimer();
  }, [resetIdleTimer, updateMood]);

  const onHoverMascot = useCallback(() => {
    if (mood !== 'secure') {
      updateMood('excited', '¡Hoola! ¿Quieres colaborar con nosotros en el proyecto?');
    }
  }, [mood, updateMood]);

  const onLeaveMascot = useCallback(() => {
    if (mood === 'excited') {
      updateMood('happy');
      resetIdleTimer();
    }
  }, [mood, resetIdleTimer, updateMood]);

  const onActionSuccess = useCallback(
    (message = '¡Solicitud registrada con éxito! Te contactaremos pronto.') => {
      updateMood('excited', message);
      setTimeout(() => {
        updateMood('happy');
        resetIdleTimer();
      }, 4000);
    },
    [resetIdleTimer, updateMood]
  );

  return {
    mood,
    speech,
    updateMood,
    onFocusInput,
    onBlurInput,
    onHoverMascot,
    onLeaveMascot,
    onActionSuccess,
    resetIdleTimer,
  };
}
