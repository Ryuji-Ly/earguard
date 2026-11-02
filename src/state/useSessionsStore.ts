import { create } from 'zustand';
import { getSessions, saveSession } from '@/services/sessionService';
import type { LoadStatus } from '@/types/LoadStatus';
import type { MeasurementSession, NewMeasurementSession } from '@/types/MeasurementSession';

// Shorter sessions are usually an accidental start/stop; not worth a row in the history.
export const MIN_SESSION_SECONDS = 10;

// What happened to the session that just ended (shown on the Meter tab).
export type SaveStatus = 'saving' | 'saved' | 'error' | 'tooShort';

interface SessionsState {
  // History, cached: loaded once, then kept up to date by recordSession.
  sessions: MeasurementSession[];
  status: LoadStatus;
  errorMessage: string | undefined;
  // The most recently finished session and whether it was saved.
  lastSession: NewMeasurementSession | undefined;
  saveStatus: SaveStatus | undefined;
  saveError: string | undefined;
  loadSessions: (force?: boolean) => Promise<void>;
  recordSession: (session: NewMeasurementSession) => Promise<void>;
  retrySave: () => Promise<void>;
  clearLastSession: () => void;
  // Forget everything, e.g. on logout, so the next user never sees these sessions.
  reset: () => void;
}

// The data part of the store (no actions); reused by reset().
type SessionsData = Omit<SessionsState, 'loadSessions' | 'recordSession' | 'retrySave' | 'clearLastSession' | 'reset'>;

const initialState: SessionsData = {
  sessions: [],
  status: 'idle',
  errorMessage: undefined,
  lastSession: undefined,
  saveStatus: undefined,
  saveError: undefined,
};

export const useSessionsStore = create<SessionsState>((set, get) => ({
  ...initialState,

  loadSessions: async (force = false) => {
    const { status } = get();
    if (status === 'loading' || (status === 'loaded' && !force)) return;
    set({ status: 'loading', errorMessage: undefined });
    try {
      const sessions = await getSessions();
      set({ sessions, status: 'loaded' });
    } catch (error) {
      set({ status: 'error', errorMessage: error instanceof Error ? error.message : 'Could not load your sessions.' });
    }
  },

  recordSession: async (session) => {
    if (session.durationSeconds < MIN_SESSION_SECONDS) {
      set({ lastSession: session, saveStatus: 'tooShort', saveError: undefined });
      return;
    }
    set({ lastSession: session, saveStatus: 'saving', saveError: undefined });
    try {
      const saved = await saveSession(session);
      // Newest first, like the database query, so the History tab doesn't need to refetch.
      set({ sessions: [saved, ...get().sessions], saveStatus: 'saved' });
    } catch (error) {
      set({ saveStatus: 'error', saveError: error instanceof Error ? error.message : 'Could not save this session.' });
    }
  },

  retrySave: async () => {
    const { lastSession } = get();
    if (lastSession !== undefined) {
      await get().recordSession(lastSession);
    }
  },

  clearLastSession: () => set({ lastSession: undefined, saveStatus: undefined, saveError: undefined }),

  reset: () => set(initialState),
}));
