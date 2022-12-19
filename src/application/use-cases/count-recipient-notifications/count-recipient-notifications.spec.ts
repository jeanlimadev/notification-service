import { makeNotification } from '@test/factories/notification-factories';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipient_id: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipient_id: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipient_id: 'recipient-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipient_id: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
