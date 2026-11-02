import type { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/services/supabase';
import type { MeasurementSessionRow } from '@/types/Database';
import type { MeasurementSession, NewMeasurementSession } from '@/types/MeasurementSession';

// Stores finished measurements in Supabase. Row Level Security makes sure every
// query only ever sees the logged-in user's own sessions.

const HISTORY_LIMIT = 50;

export async function getSessions(): Promise<MeasurementSession[]> {
  const { data, error } = await supabase
    .from('measurement_sessions')
    .select('*')
    .order('started_at', { ascending: false })
    .limit(HISTORY_LIMIT);
  if (error !== null) {
    throw toFriendlyError(error, 'Could not load your sessions.');
  }
  return data.map(toSession);
}

export async function saveSession(session: NewMeasurementSession): Promise<MeasurementSession> {
  const { data, error } = await supabase
    .from('measurement_sessions')
    .insert({
      started_at: session.startedAt,
      duration_seconds: session.durationSeconds,
      average_db: session.averageDb,
      peak_db: session.peakDb,
      dose_percent: session.dosePercent,
    })
    // Return the saved row, so we get the id the database created.
    .select()
    .single();
  if (error !== null) {
    throw toFriendlyError(error, 'Could not save this session.');
  }
  return toSession(data);
}

export async function deleteSession(id: string): Promise<void> {
  const { error } = await supabase.from('measurement_sessions').delete().eq('id', id);
  if (error !== null) {
    throw toFriendlyError(error, 'Could not delete this session.');
  }
}

// Database rows use snake_case; the rest of the app uses camelCase.
function toSession(row: MeasurementSessionRow): MeasurementSession {
  return {
    id: row.id,
    startedAt: row.started_at,
    durationSeconds: row.duration_seconds,
    averageDb: row.average_db,
    peakDb: row.peak_db,
    dosePercent: row.dose_percent,
  };
}

function toFriendlyError(error: PostgrestError, fallback: string): Error {
  // supabase-js reports a failed network request as a fetch error without a database code.
  if (error.message.includes('Failed to fetch') || error.message.includes('Network request failed')) {
    return new Error("You're offline. Check your connection and try again.");
  }
  return new Error(fallback);
}
