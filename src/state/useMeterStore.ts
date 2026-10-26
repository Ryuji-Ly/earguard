import { create } from 'zustand';
import { getDemoReadings } from '@/services/soundService';
import { startListening } from '@/services/microphoneService';
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
  selectDemo: (id: string) => void;
  startLive: () => Promise<void>;
  stopLive: () => void;
}

const initialReadings = getDemoReadings();

export const useMeterStore = create<MeterState>((set, get) => ({
  mode: 'demo',
  demoReadings: initialReadings,
  selectedDemoId: initialReadings[0]?.id ?? '',
  micStatus: 'idle',
  liveDb: undefined,
  session: undefined,

  selectDemo: (id) => set({ selectedDemoId: id }),

  startLive: async () => {
    const { micStatus } = get();
    if (micStatus === 'requesting' || micStatus === 'listening') {
      return;
    }
    set({ micStatus: 'requesting' });

    const result = await startListening((db) => set({ liveDb: db }));
    if (!result.ok) {
      // Fall back to demo mode; micStatus tells the UI which message to show.
      set({ micStatus: result.error, mode: 'demo' });
      return;
    }
    set({ session: result.session, micStatus: 'listening', mode: 'live', liveDb: undefined });
  },

  stopLive: () => {
    get().session?.stop();
    set({ session: undefined, micStatus: 'idle', mode: 'demo', liveDb: undefined });
  },
}));
