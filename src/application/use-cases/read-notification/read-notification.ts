import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../repositories/notifications-repositories';
import { NotificationNotFoundError } from '../errors/notification-not-found-error';

interface ReadNotificationRequest {
  notification_id: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notification_id } = request;

    const notification = await this.notificationsRepository.findById(
      notification_id,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
