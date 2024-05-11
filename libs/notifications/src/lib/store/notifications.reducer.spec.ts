import { INotification } from '@sofitay/models';
import { initialState, notificationsFeature } from './notifications.reducer';
import { NotificationsUserActions } from './notifications.actions';

describe('NotificationsReducer actions', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = notificationsFeature.reducer(initialState, action);
      expect(state).toStrictEqual(initialState);
    });
  });

  describe('closeNotification action', () => {
    it('should return a new sate with isOpen to false', () => {
      const action = NotificationsUserActions.closeNotification();
      const state = notificationsFeature.reducer({ ...initialState }, action);
      expect(state.isOpen).toBeFalsy();
    });
  });

  describe('addNotification action', () => {
    it('should return the state with the new notification', () => {
      const notification: INotification = { title: 'Some title', icon: 'user' };
      const action = NotificationsUserActions.addNotification({ notification });
      const state = notificationsFeature.reducer({ ...initialState }, action);
      expect(state.notifications).toContain(notification);
    });
  });

  describe('removeNotification action', () => {
    it('should return the state without the notification', () => {
      const notification: INotification = { title: 'Some title', icon: 'user' };
      const action = NotificationsUserActions.removeNotification({ notification });
      const state = notificationsFeature.reducer({ ...initialState, notifications: [notification] }, action);
      expect(state.notifications).not.toContain(notification);
    });
  });
});
