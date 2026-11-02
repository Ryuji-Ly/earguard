import type { NewMeasurementSession } from '@/types/MeasurementSession';
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

// ---- Exposure over time (one live session) ----
// A tally is updated with every reading and summarised when the session stops.
// Pure functions: they return a new tally instead of changing the old one.

export interface ExposureTally {
  startedAt: string;
  totalSeconds: number;
  // Sum of sound energy × time, for the energy average (Leq).
  energySum: number;
  peakDb: number;
  // Share of the daily dose used so far (1 = the full day's allowance).
  doseFraction: number;
}

// A reading counts for the time since the previous one, but never more than this:
// if the phone sleeps and timers pause, we don't want one reading to cover minutes.
const MAX_SECONDS_PER_READING = 5;

export function startTally(startedAt: Date): ExposureTally {
  return { startedAt: startedAt.toISOString(), totalSeconds: 0, energySum: 0, peakDb: 0, doseFraction: 0 };
}

export function addReading(tally: ExposureTally, db: number, seconds: number): ExposureTally {
  const counted = Math.min(Math.max(seconds, 0), MAX_SECONDS_PER_READING);
  const safeMinutes = safeListeningMinutes(db);
  return {
    startedAt: tally.startedAt,
    totalSeconds: tally.totalSeconds + counted,
    // dB is logarithmic: convert to energy before adding (10^(dB/10)).
    energySum: tally.energySum + Math.pow(10, db / 10) * counted,
    peakDb: Math.max(tally.peakDb, db),
    // Below 85 dB there's no daily limit, so it doesn't use up any dose.
    doseFraction: tally.doseFraction + (safeMinutes === undefined ? 0 : counted / (safeMinutes * 60)),
  };
}

export function summariseTally(tally: ExposureTally): NewMeasurementSession {
  const averageDb = tally.totalSeconds === 0 ? 0 : 10 * Math.log10(tally.energySum / tally.totalSeconds);
  return {
    startedAt: tally.startedAt,
    durationSeconds: Math.round(tally.totalSeconds),
    averageDb: Math.round(averageDb * 10) / 10,
    peakDb: Math.round(tally.peakDb),
    dosePercent: Math.round(tally.doseFraction * 1000) / 10,
  };
}

// How much of the daily dose a session used, for colouring and labelling it.
export type DoseLevel = 'low' | 'high' | 'over';

export function classifyDose(dosePercent: number): DoseLevel {
  if (dosePercent >= 100) return 'over';
  if (dosePercent >= 50) return 'high';
  return 'low';
}

export function formatDose(dosePercent: number): string {
  // Small doses keep one decimal so a short session doesn't show as 0%.
  return dosePercent < 10 ? `${dosePercent.toFixed(1)}%` : `${Math.round(dosePercent)}%`;
}

// Compact duration for tight spaces such as stat columns: "2h 30m", "45m", "<1m".
export function formatDurationShort(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  if (minutes < 1) return '<1m';
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours}h` : `${hours}h ${rest}m`;
}
