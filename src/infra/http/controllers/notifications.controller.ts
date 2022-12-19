import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { CancelNotification } from '@application/use-cases/cancel-notification/cancel-notification';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications/count-recipient-notifications';
import { SendNotification } from '@application/use-cases/send-notification/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications/get-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification/unread-notification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notification_id: id,
    });
  }

  @Get('count/from/:recipient_id')
  async countFromRecipient(@Param('recipient_id') recipient_id: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipient_id,
    });

    return {
      count,
    };
  }

  @Get('from/:recipient_id')
  async getFromRecipient(@Param('recipient_id') recipient_id: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipient_id,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notification_id: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notification_id: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipient_id, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipient_id,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
