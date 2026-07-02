import { create } from 'zustand';
import { authApi } from '../api/auth.api';
import type { User, Session, LoginPayload, RegisterPayload } from '../types';

interface AuthStore {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;

  // Actions
  initialize: () => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  session: null,
  isLoading: false,
  isInitialized: false,
  error: null,

  initialize: async () => {
    try {
      const session = await authApi.getSession();
      set({
        session,
        user: session?.user ?? null,
        isInitialized: true,
      });

      // Listen for auth state changes (token refresh, sign out from another tab, etc.)
      authApi.onAuthStateChange((newSession) => {
        set({
          session: newSession,
          user: newSession?.user ?? null,
        });
      });
    } catch {
      set({ isInitialized: true });
    }
  },

  login: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const session = await authApi.signIn(payload);
      set({ session, user: session.user, isLoading: false });
    } catch (e: unknown) {
      set({ error: (e as Error).message, isLoading: false });
      throw e;
    }
  },

  register: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const session = await authApi.signUp(payload);
      set({ session, user: session?.user ?? null, isLoading: false });
    } catch (e: unknown) {
      set({ error: (e as Error).message, isLoading: false });
      throw e;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authApi.signOut();
    } finally {
      set({ user: null, session: null, isLoading: false });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.forgotPassword({ email });
      set({ isLoading: false });
    } catch (e: unknown) {
      set({ error: (e as Error).message, isLoading: false });
      throw e;
    }
  },

  clearError: () => set({ error: null }),
}));
