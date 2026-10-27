import type { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/services/supabase';
import type { Credentials } from '@/types/Credentials';
import type { User } from '@/types/User';

// Real login through Supabase Auth. The demo account exists in the Supabase project
// (Authentication → Users) and is listed in the README so the lecturer can log in.
const demoCredentials: Credentials = { email: 'demo@earguard.app', password: 'festival123' };

export function getDemoCredentials(): Credentials {
  return demoCredentials;
}

export async function login(email: string, password: string): Promise<User> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });
  if (error !== null) {
    // Status 0 / no status means the request never reached Supabase (offline, blocked, ...).
    if (error.status === undefined || error.status === 0) {
      throw new Error("Can't reach the server. Check your internet connection and try again.");
    }
    throw new Error('Invalid email or password.');
  }
  return toUser(data.user);
}

// The session Supabase saved on this device, if any (stays logged in after a refresh).
export async function getCurrentUser(): Promise<User | undefined> {
  const { data } = await supabase.auth.getSession();
  return data.session === null ? undefined : toUser(data.session.user);
}

export async function logout(): Promise<void> {
  // 'local' only ends the session on this device and works offline too.
  await supabase.auth.signOut({ scope: 'local' });
}

// Supabase's user object has many fields; the app only needs these.
function toUser(user: SupabaseUser): User {
  const email = user.email ?? '';
  const metadataName: unknown = user.user_metadata.name;
  return {
    id: user.id,
    email,
    // No name stored yet: fall back to the part of the email before the @.
    name: typeof metadataName === 'string' ? metadataName : email.split('@')[0] ?? email,
  };
}
