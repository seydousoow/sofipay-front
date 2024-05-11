import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { notificationsFeature } from './store/notifications.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NotificationsEffects } from './store/notifications.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(notificationsFeature),
    EffectsModule.forFeature([NotificationsEffects]),
  ]
})
export class NotificationsStoreModule {

}
