import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { Notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipient_id: notification.recipient_id,
      canceled_at: notification.canceled_at,
      read_at: notification.read_at,
      created_at: notification.created_at,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipient_id: raw.recipient_id,
        canceled_at: raw.canceled_at,
        read_at: raw.read_at,
        created_at: raw.created_at,
      },
      raw.id,
    );
  }
}
