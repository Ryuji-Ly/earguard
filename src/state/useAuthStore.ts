import { create } from 'zustand';
import {
  getCurrentUser,
  getDemoCredentials,
  login as loginService,
  logout as logoutService,
} from '@/services/authService';
import type { Credentials } from '@/types/Credentials';
import type { User } from '@/types/User';

interface AuthState {
  user: User | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  // True until we've checked for a saved session at startup. While true, the app
  // shows a loader instead of sending the user to the login screen too early.
  isRestoring: boolean;
  // Shown on the login screen so the lecturer can log in with the demo account.
  demoCredentials: Credentials;
  restoreSession: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: undefined,
  isAuthenticated: false,
  isLoading: false,
  isRestoring: true,
  demoCredentials: getDemoCredentials(),
  restoreSession: async () => {
    try {
      const user = await getCurrentUser();
      set({ user, isAuthenticated: user !== undefined });
    } finally {
      set({ isRestoring: false });
    }
  },
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const user = await loginService(email, password);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  logout: async () => {
    try {
      await logoutService();
    } finally {
      // Clear the local state even if Supabase couldn't be reached.
      set({ user: undefined, isAuthenticated: false });
    }
  },
}));
