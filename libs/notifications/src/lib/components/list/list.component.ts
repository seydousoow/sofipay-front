import { Component, HostBinding } from '@angular/core';

import { LetDirective } from '@ngrx/component';
import { NotificationComponent } from '@sofitay/atoms';
import { Store } from '@ngrx/store';
import { NOTIFICATIONS_SELECTORS } from '../../store/notifications.selectors';
import { INotification } from '@sofitay/models';
import { NotificationsUserActions } from '../../store/notifications.actions';

@Component({
  selector: 'horizon-notifications-list',
  standalone: true,
  imports: [LetDirective, NotificationComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  notifications$ = this.store.select(NOTIFICATIONS_SELECTORS.selectNotifications);
  @HostBinding('attr.aria-live') private ariaLive = 'assertive';

  constructor(private store: Store) {}

  close(notification: INotification): void {
    this.store.dispatch(NotificationsUserActions.removeNotification({ notification }));
  }
}
