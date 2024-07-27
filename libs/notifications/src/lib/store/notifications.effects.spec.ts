import { INotification } from '@sofipay/models';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { NotificationsEffects } from './notifications.effects';
import { cold, hot, Scheduler } from 'jest-marbles';
import { NotificationsUserActions } from './notifications.actions';

let action$ = new Observable<Action>();
TestBed.configureTestingModule({
  providers: [
    NotificationsEffects,
    provideMockActions(() => action$),
  ]
});

const effects = TestBed.inject(NotificationsEffects);

describe('Notification effects', () => {

  describe('addNotification effect', () => {
    it('should dispatch the action: removeNotification after 30ms', () => {
      const scheduler = Scheduler.get();
      scheduler.run(() => {
        const notification: INotification = { title: 'Some title', icon: 'user', timeout: 30 };
        action$ = hot('a', {
          a: NotificationsUserActions.addNotification({ notification })
        });

        const expected = cold('30ms a', {
          a: NotificationsUserActions.removeNotification({ notification })
        });

        expect(effects.addNotification$).toBeObservable(expected);
      });
    });
  });

});
