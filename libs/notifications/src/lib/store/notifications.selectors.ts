import { notificationsFeature } from './notifications.reducer';
import { createSelector } from '@ngrx/store';

const selectIsLoading = createSelector(
  notificationsFeature.selectIsLoadingLast,
  notificationsFeature.selectIsLoadingTypes,
  (l1, l2) => l1 || l2,
);

const selectNotificationHeaderIfActive = createSelector(
  notificationsFeature.selectNotificationHeader,
  (notification) => {
    if (notification && notification.active) return notification;
    return null;
  },
);

export const NOTIFICATIONS_SELECTORS = {
  ...notificationsFeature,
  selectIsLoading,
  selectNotificationHeaderIfActive,
};
