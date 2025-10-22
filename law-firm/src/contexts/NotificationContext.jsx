import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import signalRService from '../services/signalRService';
import { useAuthStore } from '../store/useAuthStore';

// Notification settings
const NOTIFICATION_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const STORAGE_KEY = 'notifications';

// Create context
const NotificationContext = createContext();

// Load notifications from localStorage
const loadNotifications = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const notifications = JSON.parse(saved);
    const now = Date.now();

    // Filter out expired notifications
    const validNotifications = notifications.filter(n => {
      const age = now - new Date(n.timestamp).getTime();
      return age < NOTIFICATION_TTL;
    });

    // Save back if some were filtered out
    if (validNotifications.length !== notifications.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validNotifications));
    }

    return validNotifications;
  } catch (error) {
    console.error('Failed to load notifications:', error);
    return [];
  }
};

// Save notifications to localStorage
const saveNotifications = (notifications) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  } catch (error) {
    console.error('Failed to save notifications:', error);
  }
};

export const NotificationProvider = ({ children }) => {
  const { accessToken, isAuthenticated } = useAuthStore();
  const [notifications, setNotifications] = useState(() => loadNotifications());
  const [isConnected, setIsConnected] = useState(false);

  // Save to localStorage whenever notifications change
  useEffect(() => {
    saveNotifications(notifications);
  }, [notifications]);

  // Clean up expired notifications periodically
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      setNotifications(prev => {
        const now = Date.now();
        const validNotifications = prev.filter(n => {
          const age = now - new Date(n.timestamp).getTime();
          return age < NOTIFICATION_TTL;
        });
        return validNotifications.length === prev.length ? prev : [...validNotifications];
      });
    }, 60 * 60 * 1000); // Check every hour

    return () => clearInterval(cleanupInterval);
  }, []);

  // Connect to SignalR when authenticated
  useEffect(() => {
    let removeListener = null;

    const connectToSignalR = async () => {
      if (isAuthenticated && accessToken) {
        try {
          await signalRService.start(accessToken);
          setIsConnected(true);

          // Add listener for notifications
          removeListener = signalRService.addListener((notification) => {
            addNotification(notification);
          });
        } catch (error) {
          console.error('Failed to connect to SignalR:', error);
          setIsConnected(false);

          // Try to reconnect after 5 seconds
          setTimeout(() => {
            connectToSignalR();
          }, 5000);
        }
      } else {
        console.log('Not connecting to SignalR - Auth status:', isAuthenticated, 'Token exists:', !!accessToken);
      }
    };

    connectToSignalR();

    // Cleanup on unmount
    return () => {
      if (removeListener) {
        removeListener();
      }
      signalRService.stop();
      setIsConnected(false);
    };
  }, [isAuthenticated, accessToken]);

  // Mark notification as read
  const markAsRead = useCallback((notificationId) => {
    setNotifications(prev => {
      const updated = prev.map(n =>
        n.id === notificationId ? { ...n, isRead: true } : n
      );
      return updated;
    });
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, isRead: true }))
    );
  }, []);

  // Clear all notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Add a new notification
  const addNotification = useCallback((notification) => {
    setNotifications(prev => {
      // Prevent duplicates
      if (prev.some(n => n.id === notification.id)) {
        return prev;
      }
      return [notification, ...prev];
    });
  }, []);

  const contextValue = {
    notifications,
    isConnected,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    addNotification
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <Toaster />
    </NotificationContext.Provider>
  );
};

// Custom hook for using the notification context
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;