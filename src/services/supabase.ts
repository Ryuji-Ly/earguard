import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// The one Supabase client for the whole app. Only services import this file;
// pages, components and stores never talk to Supabase directly.

// Expo only inlines env variables that start with EXPO_PUBLIC_, and only when they're
// written out in full like this (not process.env[name]). Values come from .env locally,
// and from the Vercel / GitHub Actions settings in the cloud.
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;

// `!value` also catches an empty string (what an unset CI variable turns into).
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_KEY. Copy .env.example to .env and fill them in.');
}

// The web build is pre-rendered in Node, where there's no browser storage. During that
// step the client runs without saving a session; in the browser and on the phone it
// keeps the login in AsyncStorage so it survives a refresh or app restart.
const isServer = typeof window === 'undefined';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: isServer ? undefined : AsyncStorage,
    persistSession: !isServer,
    autoRefreshToken: !isServer,
    detectSessionInUrl: false,
  },
});
