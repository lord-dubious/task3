import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message?: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(2),
      timestamp: new Date(),
      read: false,
    };

    setNotifications(prev => [newNotification, ...prev]);
    return newNotification.id;
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Toast notification helpers
  const showSuccess = useCallback((title: string, message?: string) => {
    const id = addNotification({ type: 'success', title, message });
    toast.success(title, { description: message });
    return id;
  }, [addNotification]);

  const showError = useCallback((title: string, message?: string) => {
    const id = addNotification({ type: 'error', title, message });
    toast.error(title, { description: message });
    return id;
  }, [addNotification]);

  const showWarning = useCallback((title: string, message?: string) => {
    const id = addNotification({ type: 'warning', title, message });
    toast.warning(title, { description: message });
    return id;
  }, [addNotification]);

  const showInfo = useCallback((title: string, message?: string) => {
    const id = addNotification({ type: 'info', title, message });
    toast.info(title, { description: message });
    return id;
  }, [addNotification]);

  const showPromise = useCallback(<T,>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error | unknown) => string);
    }
  ) => {
    return toast.promise(promise, {
      loading,
      success,
      error,
    });
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showPromise,
  };
}
