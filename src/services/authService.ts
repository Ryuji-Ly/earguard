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

// Creates an account and logs straight in. Requires "Confirm email" to be turned off in
// Supabase (Authentication → Sign In / Providers → Email); otherwise there's no session yet.
export async function register(name: string, email: string, password: string): Promise<User> {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    // Stored on the Supabase user as user_metadata.name; toUser() reads it back.
    options: { data: { name: name.trim() } },
  });
  if (error !== null) {
    if (error.status === undefined || error.status === 0) {
      throw new Error("Can't reach the server. Check your internet connection and try again.");
    }
    if (error.code === 'user_already_exists') {
      throw new Error('An account with this email already exists. Try logging in.');
    }
    if (error.code === 'weak_password') {
      throw new Error('Choose a stronger password (at least 6 characters).');
    }
    if (error.code === 'validation_failed' || error.code === 'email_address_invalid') {
      throw new Error('Enter a valid email address.');
    }
    throw new Error('Could not create the account. Please try again.');
  }
  if (data.session === null || data.user === null) {
    throw new Error('Account created, but it needs email confirmation first.');
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
