import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../../src/application/entities/notification';
import { NotificationRepository } from '../../../../../src/application/repositories/notifications-repositories';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        category: notification.category,
        content: notification.content.value,
        recipient_id: notification.recipient_id,
        read_at: notification.read_at,
        created_at: notification.created_at,
      },
    });
  }
}
