import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export class NotificationService {
  static sendNotification(message: string, userId: string) {
    socket.emit('sendNotification', { message, userId });
  }

  static getNotifications(userId: string, callback: (notifications: any) => void) {
    socket.emit('getNotifications', userId);
    socket.on('notifications', callback);
  }

  static markAsRead(notificationId: string) {
    socket.emit('markAsRead', notificationId);
  }

  static onNotificationReceived(callback: (notification: any) => void) {
    socket.on('notification', callback);
  }

  static onNotificationRead(callback: (notification: any) => void) {
    socket.on('notificationRead', callback);
  }
}
