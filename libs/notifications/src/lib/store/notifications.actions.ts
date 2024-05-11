import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { INotification } from '@sofitay/models';

export const NotificationsUserActions = createActionGroup({
  source: 'Notifications',
  events: {
    'Close Notification': emptyProps(),
    'Add Notification': props<{ notification: INotification }>(),
    'Remove Notification': props<{ notification: INotification }>(),
  },
});
