import { create } from 'zustand';
import {
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
  // Only set while login is mocked, so the login screen can show the demo account.
  demoCredentials: Credentials | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: undefined,
  isAuthenticated: false,
  isLoading: false,
  demoCredentials: getDemoCredentials(),
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
    await logoutService();
    set({ user: undefined, isAuthenticated: false });
  },
}));
