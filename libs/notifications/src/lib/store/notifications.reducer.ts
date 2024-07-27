import { INotification, INotificationHeader, TNotificationHeader } from '@sofipay/models';
import { createFeature, createReducer, on } from '@ngrx/store';
import { NotificationsUserActions } from './notifications.actions';

type TNotificationsState = {
  notifications: INotification[];
  notificationHeader: INotificationHeader | null;
  notificationTypes: TNotificationHeader[];
  isLoadingLast: boolean;
  isLoadingTypes: boolean;
  isOpen: boolean;
};

export const initialState: TNotificationsState = {
  notifications: [],
  notificationHeader: null,
  notificationTypes: [],
  isLoadingLast: true,
  isLoadingTypes: true,
  isOpen: true
};

export const notificationsFeature = createFeature({
  name: 'notifications',
  reducer: createReducer(
    initialState,
    on(NotificationsUserActions.addNotification, (state, { notification }) => ({
      ...state,
      notifications: [...state.notifications, notification]
    })),
    on(NotificationsUserActions.removeNotification, (state, { notification }) => ({
      ...state,
      notifications: state.notifications.filter((n) => n !== notification)
    })),

    on(NotificationsUserActions.closeNotification, (state) => ({
      ...state,
      isOpen: false
    }))
  )
});
