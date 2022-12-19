import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../repositories/notifications-repositories';
import { NotificationNotFoundError } from '../errors/notification-not-found-error';

interface CancelNotificationRequest {
  notification_id: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notification_id } = request;

    const notification = await this.notificationsRepository.findById(
      notification_id,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
