import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../repositories/notifications-repositories';
import { NotificationNotFoundError } from '../errors/notification-not-found-error';

interface UnreadNotificationRequest {
  notification_id: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notification_id } = request;

    const notification = await this.notificationsRepository.findById(
      notification_id,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
