import { api } from './client';
import type { Notification } from '../types';

export const notificationsApi = {
  list: (page = 1, limit = 20) =>
    api.get<{ data: Notification[]; total: number; unread_count: number }>(
      'notifications',
      { page, limit }
    ),

  markRead: (id: string) =>
    api.patch<Notification>('notifications/read', { id }),

  markAllRead: () =>
    api.patch<{ success: boolean }>('notifications/read-all', {}),

  delete: (id: string) =>
    api.delete<{ success: boolean }>('notifications', { id }),
};
