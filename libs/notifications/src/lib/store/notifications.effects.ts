import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { NotificationsUserActions } from './notifications.actions';
import { map, mergeMap, timer } from 'rxjs';

@Injectable()
export class NotificationsEffects {

  addNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationsUserActions.addNotification),
      mergeMap(({ notification }) => {
        return timer(notification.timeout ? notification.timeout : 5000).pipe(
          map(() => NotificationsUserActions.removeNotification({ notification }))
        );
      })
    )
  );

  constructor(private actions$: Actions) {
  }
}
