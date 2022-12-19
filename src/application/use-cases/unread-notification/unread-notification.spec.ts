import { makeNotification } from '@test/factories/notification-factories';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { UnreadNotification } from './unread-notification';
import { NotificationNotFoundError } from '../errors/notification-not-found-error';

describe('unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({
      read_at: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      notification_id: notification.id,
    });

    expect(notificationsRepository.notifications[0].read_at).toBeNull();
  });

  it('should not be able to read a not existent notification', () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(async () => {
      await unreadNotification.execute({
        notification_id: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
