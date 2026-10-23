import type { User } from '@/types/User';

// Mock user store for the PWA assignment (login may be mocked).
// These test credentials are also listed in the README so the lecturer can log in.
interface MockAccount {
  password: string;
  user: User;
}

export const mockAccounts: MockAccount[] = [
  {
    password: 'festival123',
    user: {
      id: 'user-1',
      email: 'demo@earguard.app',
      name: 'Demo User',
      token: 'mock-token-user-1',
    },
  },
];
