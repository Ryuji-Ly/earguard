import type { DemoReading } from '@/types/DemoReading';

// Typical festival sound levels, used while live measuring isn't available.
// Live microphone measuring will be added to this service in the next step.
const demoReadings: DemoReading[] = [
  { id: 'chill', label: 'Chill zone', db: 68 },
  { id: 'bar', label: 'Bar', db: 88 },
  { id: 'crowd', label: 'Mid crowd', db: 97 },
  { id: 'front', label: 'Front stage', db: 106 },
];

export function getDemoReadings(): DemoReading[] {
  return demoReadings;
}
