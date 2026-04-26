import * as signalR from '@microsoft/signalr';
import { toast } from 'react-hot-toast';

class SignalRService {
  constructor() {
    this.connection = null;
    this.connectionPromise = null;
    this.hubUrl = import.meta.env.VITE_SIGNALR_URL;
    this.isConfigured = Boolean(this.hubUrl);
    this.listeners = new Set();

    if (!this.isConfigured) {
      console.warn('SignalR URL is not configured. Realtime notifications are disabled until VITE_SIGNALR_URL is set.');
    }
  }

  // Initialize or reuse the SignalR connection
  async start(accessToken) {
    if (!this.isConfigured) {
      return null;
    }

    if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
      return this.connection;
    }

    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionPromise = new Promise((resolve, reject) => {
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

      // ---- Event listeners ----

      // User notifications (Notify)
      this.connection.on('Notify', (notificationJson) => {
        this._processNotification(notificationJson, false);
      });

      // Staff notifications (NotifyStaff)
      this.connection.on('NotifyStaff', (notificationJson) => {
        this._processNotification(notificationJson, true);
      });

      // Group message (optional)
      this.connection.on('ReceiveMessage', (user, message) => {
      });

      // ---- Start connection ----
      this.connection
        .start()
        .then(() => {
          resolve(this.connection);
        })
        .catch((err) => {
          console.error('[SignalR] Connection error:', err);
          reject(err);
        });
    });

    return this.connectionPromise;
  }

  // Handle both Notify & NotifyStaff events
  _processNotification(notificationJson, isStaffNotification) {
    try {
      const notification =
        typeof notificationJson === 'string'
          ? JSON.parse(notificationJson)
          : notificationJson;
      const {
        Id,
        Title,
        Message,
        Type,
        userServiceId,
        userConsultationId,
        noteId,
      } = notification;

      const formatted = {
        id: Id || Date.now(),
        title: Title || 'New notification',
        message: Message || Title || 'New Notification',
        type: (Type || 'info').toLowerCase(),
        isStaffNotification,
        userServiceId,
        userConsultationId,
        noteId,
        timestamp: new Date().toISOString(),
      };

      // Show context-based message
      if (formatted.userServiceId) {
        this._showToast({ ...formatted, message: `تم تقديم طلب خدمة جديد (رقم: ${formatted.userServiceId})` });
      } else if (formatted.userConsultationId) {
        this._showToast({ ...formatted, message: `تم تقديم طلب استشارة جديد (رقم: ${formatted.userConsultationId})` });
      } else if (formatted.noteId) {
        this._showToast({ ...formatted, message: 'تم إضافة ملاحظة جديدة لطلبك' });
      } else {
        this._showToast(formatted);
      }

      // Notify all app subscribers
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

  // Toast display
  _showToast(notification) {
    toast(notification.message, {
      duration: 5000,
      position: 'top-right',
      className: `notification-toast notification-${notification.type}`,
    });
  }

  // Subscribe to new notifications
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
    }
  }
}

// Export singleton
const signalRService = new SignalRService();
export default signalRService;
