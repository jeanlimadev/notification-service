import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Nova notificação de amizade'),
      category: 'social',
      recipient_id: 'example recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
