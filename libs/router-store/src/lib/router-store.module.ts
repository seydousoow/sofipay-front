import { isDevMode, NgModule } from '@angular/core';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { CustomRouterStateSerializer, routerReducers } from './router.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    StoreRouterConnectingModule.forRoot({
      serializer: CustomRouterStateSerializer,
    }),
    StoreModule.forRoot(routerReducers),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() , connectInZone: true}),
  ],
})
export class RouterStoreModule {}
