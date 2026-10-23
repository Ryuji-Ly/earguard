import type { Credentials } from '@/types/Credentials';
import type { User } from '@/types/User';
import { mockAccounts } from '@/services/mock/users';

// Simulated network latency so loading states are visible, like a real backend call.
const MOCK_DELAY_MS = 600;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Mocked for the PWA. Replace the body with Supabase auth later; the signature stays the same.
export async function login(email: string, password: string): Promise<User> {
  await wait(MOCK_DELAY_MS);
  const normalisedEmail = email.trim().toLowerCase();
  const account = mockAccounts.find(
    (candidate) => candidate.user.email === normalisedEmail && candidate.password === password,
  );
  if (account === undefined) {
    throw new Error('Invalid email or password');
  }
  return account.user;
}

// Only meaningful while login is mocked; remove together with the mock.
export function getDemoCredentials(): Credentials | undefined {
  const account = mockAccounts[0];
  if (account === undefined) return undefined;
  return { email: account.user.email, password: account.password };
}

export async function logout(): Promise<void> {
  await wait(MOCK_DELAY_MS / 2);
}
