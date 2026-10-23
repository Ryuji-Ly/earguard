export type SoundLevel = 'quiet' | 'moderate' | 'loud' | 'dangerous';

export interface SoundLevelInfo {
  level: SoundLevel;
  label: string;
  description: string;
}
