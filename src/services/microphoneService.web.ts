import type { MicrophoneError, StartListeningResult } from '@/types/Microphone';

// Web version, picked automatically by the bundler on web because of the `.web.ts` suffix.
// Native builds get microphoneService.ts instead, so these browser APIs never reach native code.

// Phone microphones aren't calibrated: the browser only gives us a level relative to the
// loudest signal the mic can record (dBFS, always <= 0). Adding a fixed offset turns that into
// a rough dB SPL estimate. It's an approximation, so the UI labels the value as an estimate.
const CALIBRATION_OFFSET_DB = 100;
const MIN_DB = 30;
const MAX_DB = 130;
const UPDATE_INTERVAL_MS = 250;
// 0..1: how much each new measurement counts. Lower = smoother but slower to react.
const SMOOTHING = 0.3;

export function isMicrophoneSupported(): boolean {
  // getUserMedia only exists on secure pages (HTTPS or localhost).
  return (
    typeof navigator !== 'undefined' &&
    navigator.mediaDevices !== undefined &&
    typeof navigator.mediaDevices.getUserMedia === 'function' &&
    typeof AudioContext !== 'undefined'
  );
}

export async function startListening(onReading: (db: number) => void): Promise<StartListeningResult> {
  if (!isMicrophoneSupported()) {
    return { ok: false, error: 'unsupported' };
  }

  let stream: MediaStream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      // Turn off the browser's voice processing: it would "even out" loud sounds,
      // which is exactly what we want to measure.
      audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
    });
  } catch (error) {
    return { ok: false, error: toMicrophoneError(error) };
  }

  const context = new AudioContext();
  // iOS starts audio contexts suspended; this works because start is called from a button press.
  await context.resume();

  const source = context.createMediaStreamSource(stream);
  const analyser = context.createAnalyser();
  analyser.fftSize = 2048;
  source.connect(analyser);

  const samples = new Float32Array(analyser.fftSize);
  let smoothedDb: number | undefined;

  const timer = setInterval(() => {
    analyser.getFloatTimeDomainData(samples);
    const db = toEstimatedDb(rootMeanSquare(samples));
    smoothedDb = smoothedDb === undefined ? db : smoothedDb + SMOOTHING * (db - smoothedDb);
    onReading(Math.round(smoothedDb));
  }, UPDATE_INTERVAL_MS);

  return {
    ok: true,
    session: {
      stop: () => {
        clearInterval(timer);
        source.disconnect();
        // Stopping the tracks turns off the browser's "microphone in use" indicator.
        stream.getTracks().forEach((track) => track.stop());
        void context.close();
      },
    },
  };
}

// Average "loudness" of the samples (-1..1) in this window.
function rootMeanSquare(samples: Float32Array): number {
  let sum = 0;
  for (const sample of samples) {
    sum += sample * sample;
  }
  return Math.sqrt(sum / samples.length);
}

function toEstimatedDb(rms: number): number {
  if (rms <= 0) {
    return MIN_DB;
  }
  const dbfs = 20 * Math.log10(rms);
  return Math.min(MAX_DB, Math.max(MIN_DB, dbfs + CALIBRATION_OFFSET_DB));
}

function toMicrophoneError(error: unknown): MicrophoneError {
  if (error instanceof DOMException) {
    if (error.name === 'NotAllowedError' || error.name === 'SecurityError') {
      return 'denied';
    }
    if (error.name === 'NotFoundError' || error.name === 'NotReadableError' || error.name === 'OverconstrainedError') {
      return 'unavailable';
    }
  }
  return 'unavailable';
}
