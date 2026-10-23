import { create } from 'zustand';
import { getDemoReadings } from '@/services/soundService';
import type { DemoReading } from '@/types/DemoReading';

interface MeterState {
  demoReadings: DemoReading[];
  selectedDemoId: string;
  selectDemo: (id: string) => void;
}

const initialReadings = getDemoReadings();

export const useMeterStore = create<MeterState>((set) => ({
  demoReadings: initialReadings,
  selectedDemoId: initialReadings[0]?.id ?? '',
  selectDemo: (id) => set({ selectedDemoId: id }),
}));
