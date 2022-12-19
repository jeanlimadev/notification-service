import { makeNotification } from '@test/factories/notification-factories';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFoundError } from '../errors/notification-not-found-error';

describe('cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notification_id: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceled_at).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a not existent notification', () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(async () => {
      await cancelNotification.execute({
        notification_id: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
