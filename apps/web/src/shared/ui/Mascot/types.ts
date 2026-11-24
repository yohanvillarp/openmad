export type MascotMood = 'happy' | 'thinking' | 'sleeping' | 'secure' | 'excited';

export interface MascotConfig {
  sleepTimeoutMs?: number;
  dialogues?: Partial<Record<MascotMood, string>>;
  enableAutoSleep?: boolean;
}
