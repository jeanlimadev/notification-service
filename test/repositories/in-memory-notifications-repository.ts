import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notifications-repositories';

export class InMemoryNotificationsRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async findById(notification_id: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notification_id,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async countManyByRecipientId(recipient_id: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipient_id === recipient_id,
    ).length;
  }

  async findManyByRecipientId(recipient_id: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipient_id === recipient_id,
    );
  }
}
