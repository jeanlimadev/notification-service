import { Notification } from '@application/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../repositories/notifications-repositories';

interface GetRecipientNotificationsRequest {
  recipient_id: string;
}

interface GetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(
    request: GetRecipientNotificationsRequest,
  ): Promise<GetRecipientNotificationsResponse> {
    const { recipient_id } = request;

    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipient_id);

    return {
      notifications,
    };
  }
}
