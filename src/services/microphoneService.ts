import type { StartListeningResult } from '@/types/Microphone';

// Native version (iOS/Android). The web version lives in microphoneService.web.ts.
// Live measuring on native comes with the native app (e.g. expo-audio); until then
// it reports 'unsupported' so the app falls back to demo readings.

export function isMicrophoneSupported(): boolean {
  return false;
}

export async function startListening(_onReading: (db: number) => void): Promise<StartListeningResult> {
  return { ok: false, error: 'unsupported' };
}
