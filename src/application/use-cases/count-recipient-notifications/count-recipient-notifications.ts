import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../repositories/notifications-repositories';

interface CountRecipientNotificationsRequest {
  recipient_id: string;
}

interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(
    request: CountRecipientNotificationsRequest,
  ): Promise<CountRecipientNotificationsResponse> {
    const { recipient_id } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipient_id,
    );

    return {
      count,
    };
  }
}
