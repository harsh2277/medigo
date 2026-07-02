import { useState, useCallback } from 'react';
import { notificationsApi } from '../api/notifications.api';
import { useAppStore } from '../store/appStore';
import type { Notification } from '../types';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { decrementUnreadCount, resetUnreadCount } = useAppStore();

  const fetchNotifications = useCallback(async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await notificationsApi.list(page);
      setNotifications(result.data.data);
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markRead = useCallback(async (id: string) => {
    try {
      await notificationsApi.markRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      decrementUnreadCount();
    } catch (e: unknown) {
      setError((e as Error).message);
    }
  }, [decrementUnreadCount]);

  const markAllRead = useCallback(async () => {
    try {
      await notificationsApi.markAllRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      resetUnreadCount();
    } catch (e: unknown) {
      setError((e as Error).message);
    }
  }, [resetUnreadCount]);

  return { notifications, isLoading, error, fetchNotifications, markRead, markAllRead };
};
