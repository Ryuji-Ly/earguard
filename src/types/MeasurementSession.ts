// A finished live measurement, as the app uses it (camelCase, dates as ISO strings).
export interface MeasurementSession {
  id: string;
  startedAt: string;
  durationSeconds: number;
  averageDb: number;
  peakDb: number;
  dosePercent: number;
}

// What the app sends when saving: the database creates the id (and fills in the user).
export type NewMeasurementSession = Omit<MeasurementSession, 'id'>;
