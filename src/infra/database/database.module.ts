import { Module } from '@nestjs/common';
import { NotificationRepository } from 'src/application/repositories/notifications-repositories';
import { PrismaService } from '../database/prisma/prisma.service';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notification-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
