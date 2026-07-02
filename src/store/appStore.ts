import { create } from 'zustand';
import type { UserProfile, Notification } from '../types';

interface AppStore {
  profile: UserProfile | null;
  unreadNotificationCount: number;
  isOnline: boolean;
  theme: 'light' | 'dark';

  setProfile: (profile: UserProfile | null) => void;
  setUnreadCount: (count: number) => void;
  setIsOnline: (online: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  decrementUnreadCount: () => void;
  resetUnreadCount: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  profile: null,
  unreadNotificationCount: 0,
  isOnline: true,
  theme: 'light',

  setProfile: (profile) => set({ profile }),
  setUnreadCount: (count) => set({ unreadNotificationCount: count }),
  setIsOnline: (isOnline) => set({ isOnline }),
  setTheme: (theme) => set({ theme }),

  decrementUnreadCount: () =>
    set({ unreadNotificationCount: Math.max(0, get().unreadNotificationCount - 1) }),

  resetUnreadCount: () => set({ unreadNotificationCount: 0 }),
}));
