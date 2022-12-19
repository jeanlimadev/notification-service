import { makeNotification } from '@test/factories/notification-factories';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { ReadNotification } from './read-notification';
import { NotificationNotFoundError } from '../errors/notification-not-found-error';

describe('read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notification_id: notification.id,
    });

    expect(notificationsRepository.notifications[0].read_at).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a not existent notification', () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(async () => {
      await readNotification.execute({
        notification_id: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
