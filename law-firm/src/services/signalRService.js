import * as signalR from '@microsoft/signalr';
import { toast } from 'react-hot-toast';

class SignalRService {
  constructor() {
    this.connection = null;
    this.connectionPromise = null;
    this.hubUrl = 'https://alabduljabbarandalfaisalapi.runasp.net/notificationhub';
    this.listeners = new Set();
  }

  // Initialize or reuse the SignalR connection
  async start(accessToken) {
    if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
      console.log('[SignalR] Already connected');
      return this.connection;
    }

    if (this.connectionPromise) {
      console.log('[SignalR] Reusing existing connection promise');
      return this.connectionPromise;
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      console.log('[SignalR] Creating new connection to:', this.hubUrl);

      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubUrl, {
          accessTokenFactory: () => accessToken,
        })
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect([0, 2000, 5000, 10000, 20000, 30000])
        .build();

      // Reconnection handling
      this.connection.onreconnecting((err) => {
        console.warn('[SignalR] Reconnecting...', err);
      });

      this.connection.onreconnected((id) => {
        console.info('[SignalR] Reconnected with ID:', id);
      });

      this.connection.onclose((err) => {
        console.warn('[SignalR] Connection closed:', err);
        this.connectionPromise = null;
      });

      // Listen for user notifications (from Notify)
      this.connection.on('Notify', (notificationJson) => {
        console.log('[SignalR] Received user notification:', notificationJson);
        this._processNotification(notificationJson, false);
      });

      // Listen for staff notifications (from NotifyStaff)
      this.connection.on('NotifyStaff', (notificationJson) => {
        console.log('[SignalR] Received staff notification:', notificationJson);
        this._processNotification(notificationJson, true);
      });

      // Optional: Group messages (if your backend uses ReceiveMessage)
      this.connection.on('ReceiveMessage', (user, message) => {
        console.log('[SignalR] Group message received:', { user, message });
      });

      // Start connection
      this.connection
        .start()
        .then(() => {
          console.log('[SignalR] Connected successfully');
          resolve(this.connection);
        })
        .catch((err) => {
          console.error('[SignalR] Connection error:', err);
          this.connectionPromise = null;
          reject(err);
        });
    });

    return this.connectionPromise;
  }

  // Handle both Notify & NotifyStaff events
  _processNotification(notificationJson, isStaffNotification) {
    try {
      console.log('[SignalR] Received notification:', notificationJson);
      const notification =
        typeof notificationJson === 'string'
          ? JSON.parse(notificationJson)
          : notificationJson;

      const formatted = {
        id: notification.Id || Date.now(),
        title: notification.Title || 'New notification',
        message: notification.Message || notification.Title || 'New Notification',
        type: notification.Type || 'info',
        isStaffNotification,
        timestamp: new Date().toISOString(),
      };

      // Show toast
      this._showToast(formatted);

      // Notify all subscribers (for app-level updates)
      this.listeners.forEach((listener) => {
        try {
          listener(formatted);
        } catch (err) {
          console.error('[SignalR] Error in notification listener:', err);
        }
      });
    } catch (err) {
      console.error('[SignalR] Failed to process notification:', err, notificationJson);
    }
  }

  // Display toast notification
  _showToast(notification) {
    const icons = {
      success: '',
      error: '',
      warning: '',
      info: '',
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
    };

    toast(notification.message, {
      duration: 5000,
      position: 'top-right',
      icon: icons[notification.type] || '🔔',
      className: `notification-toast notification-${notification.type}`,
    });
  }

  // Subscribe to new notifications (e.g., for storing or displaying in UI)
  addListener(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Stop the connection
  async stop() {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
      this.connectionPromise = null;
      console.log('[SignalR] Disconnected');
    }
  }
}

// Export a singleton
const signalRService = new SignalRService();
export default signalRService;
