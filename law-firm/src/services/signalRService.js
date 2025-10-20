import * as signalR from '@microsoft/signalr';
import { toast } from 'react-hot-toast';

class SignalRService {
  constructor() {
    this.connection = null;
    this.connectionPromise = null;
    this.hubUrl = import.meta.env.VITE_SIGNALR_URL;
    this.listeners = new Set();

    if (!this.hubUrl) {
      console.error('SignalR URL is not configured. Please set VITE_SIGNALR_URL in your environment variables.');
      throw new Error('SignalR URL is not configured');
    }
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

      // ---- Event listeners ----

      // User notifications (Notify)
      this.connection.on('Notify', (notificationJson) => {
        console.log('[SignalR] Received user notification:', notificationJson);
        this._processNotification(notificationJson, false);
      });

      // Staff notifications (NotifyStaff)
      this.connection.on('NotifyStaff', (notificationJson) => {
        console.log('[SignalR] Received staff notification:', notificationJson);
        this._processNotification(notificationJson, true);
      });

      // Group message (optional)
      this.connection.on('ReceiveMessage', (user, message) => {
        console.log('[SignalR] Group message received:', { user, message });
      });
      
      // ---- Start connection ----
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
      const notification =
        typeof notificationJson === 'string'
          ? JSON.parse(notificationJson)
          : notificationJson;

      console.log('[SignalR] Processing notification:', notification);

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
        console.log(`[SignalR] Service request notification (ID: ${formatted.userServiceId})`);
        this._showToast({ ...formatted, message: `تم تقديم طلب خدمة جديد (رقم: ${formatted.userServiceId})` });
      } else if (formatted.userConsultationId) {
        console.log(`[SignalR] Consultation notification (ID: ${formatted.userConsultationId})`);
        this._showToast({ ...formatted, message: `تم تقديم طلب استشارة جديد (رقم: ${formatted.userConsultationId})` });
      } else if (formatted.noteId) {
        console.log(`[SignalR] Note notification (ID: ${formatted.noteId})`);
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
      console.log('[SignalR] Disconnected');
    }
  }
}

// Export singleton
const signalRService = new SignalRService();
export default signalRService;
