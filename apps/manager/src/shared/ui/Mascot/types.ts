export type MascotMood = 'happy' | 'thinking' | 'sleeping' | 'secure' | 'excited';

export interface MascotConfig {
  /** Idle timeout in milliseconds before transitioning to sleeping state (default: 18000ms) */
  sleepTimeoutMs?: number;
  /** Custom speech dialogue map for moods */
  dialogues?: Partial<Record<MascotMood, string>>;
  /** Whether the mascot should automatically go to sleep when idle */
  enableAutoSleep?: boolean;
}
