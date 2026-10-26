// Why listening could not start. The UI shows a different message (and fallback) for each.
// - unsupported: this platform/browser has no usable microphone API (or the page isn't HTTPS)
// - denied: the user (or browser settings) refused microphone permission
// - unavailable: permission was fine, but no working microphone was found or it's in use
export type MicrophoneError = 'unsupported' | 'denied' | 'unavailable';

// A running measurement. Call stop() to release the microphone.
export interface MicrophoneSession {
  stop: () => void;
}

// Either it started, or it tells you why not. The caller must check `ok` before using `session`.
export type StartListeningResult =
  | { ok: true; session: MicrophoneSession }
  | { ok: false; error: MicrophoneError };
