import type { SoundLevel, SoundLevelInfo } from '@/types/SoundLevel';

// Occupational guideline (NIOSH): 85 dB(A) is safe for 8 hours,
// and every +3 dB halves the safe time (exchange rate of 3 dB).
const REFERENCE_DB = 85;
const REFERENCE_MINUTES = 8 * 60;
const EXCHANGE_RATE_DB = 3;

export function classifyDb(db: number): SoundLevel {
  if (db < 70) return 'quiet';
  if (db < 85) return 'moderate';
  if (db < 100) return 'loud';
  return 'dangerous';
}

const levelInfo: Record<SoundLevel, SoundLevelInfo> = {
  quiet: { level: 'quiet', label: 'Quiet', description: 'No risk for your hearing.' },
  moderate: { level: 'moderate', label: 'Moderate', description: 'Safe, even for a full day.' },
  loud: { level: 'loud', label: 'Loud', description: 'Limit your time or wear earplugs.' },
  dangerous: { level: 'dangerous', label: 'Dangerous', description: 'Earplugs in now, or step back.' },
};

export function getLevelInfo(db: number): SoundLevelInfo {
  return levelInfo[classifyDb(db)];
}

// Returns undefined below the reference level: there is no practical daily limit there.
export function safeListeningMinutes(db: number): number | undefined {
  if (db < REFERENCE_DB) return undefined;
  return REFERENCE_MINUTES / Math.pow(2, (db - REFERENCE_DB) / EXCHANGE_RATE_DB);
}

export function formatDuration(minutes: number): string {
  if (minutes < 1) return 'less than a minute';
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const hours = Math.floor(minutes / 60);
  const rest = Math.round(minutes % 60);
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
}
