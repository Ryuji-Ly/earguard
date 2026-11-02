import { create } from 'zustand';
import { getDemoReadings } from '@/services/soundService';
import { startListening } from '@/services/microphoneService';
import { useSessionsStore } from '@/state/useSessionsStore';
import { addReading, startTally, summariseTally, type ExposureTally } from '@/utils/exposure';
import type { DemoReading } from '@/types/DemoReading';
import type { MicrophoneSession, MicrophoneStatus } from '@/types/Microphone';

export type MeterMode = 'demo' | 'live';

interface MeterState {
  mode: MeterMode;
  demoReadings: DemoReading[];
  selectedDemoId: string;
  micStatus: MicrophoneStatus;
  // Latest live measurement; undefined until the first reading arrives.
  liveDb: number | undefined;
  // Kept in the store (not in a page) so measuring continues while you switch tabs.
  session: MicrophoneSession | undefined;
  // Running totals of the current live session (duration, average, dose).
  tally: ExposureTally | undefined;
  // When the previous reading arrived (ms), to know how long each reading lasted.
  lastReadingAt: number | undefined;
  selectDemo: (id: string) => void;
  startLive: () => Promise<void>;
  // Stops measuring and saves the session (resolves once the save attempt is done).
  stopLive: () => Promise<void>;
}

const initialReadings = getDemoReadings();

export const useMeterStore = create<MeterState>((set, get) => ({
  mode: 'demo',
  demoReadings: initialReadings,
  selectedDemoId: initialReadings[0]?.id ?? '',
  micStatus: 'idle',
  liveDb: undefined,
  session: undefined,
  tally: undefined,
  lastReadingAt: undefined,

  selectDemo: (id) => set({ selectedDemoId: id }),

  startLive: async () => {
    const { micStatus } = get();
    if (micStatus === 'requesting' || micStatus === 'listening') {
      return;
    }
    set({ micStatus: 'requesting' });
    // A new session starts: the summary of the previous one is no longer relevant.
    useSessionsStore.getState().clearLastSession();

    const result = await startListening((db) => {
      const now = Date.now();
      const { tally, lastReadingAt } = get();
      if (tally === undefined) return;
      const seconds = lastReadingAt === undefined ? 0 : (now - lastReadingAt) / 1000;
      set({ liveDb: db, tally: addReading(tally, db, seconds), lastReadingAt: now });
    });
    if (!result.ok) {
      // Fall back to demo mode; micStatus tells the UI which message to show.
      set({ micStatus: result.error, mode: 'demo' });
      return;
    }
    set({
      session: result.session,
      micStatus: 'listening',
      mode: 'live',
      liveDb: undefined,
      tally: startTally(new Date()),
      lastReadingAt: Date.now(),
    });
  },

  stopLive: async () => {
    const { session, tally } = get();
    session?.stop();
    set({ session: undefined, micStatus: 'idle', mode: 'demo', liveDb: undefined, tally: undefined, lastReadingAt: undefined });
    if (tally !== undefined) {
      // Hand the finished session to the sessions store, which saves it to Supabase.
      await useSessionsStore.getState().recordSession(summariseTally(tally));
    }
  },
}));
