import { appRoutes } from './app.routes';

import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { provideStore } from '@ngrx/store';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NotificationsStoreModule } from '@sofipay/notifications';
import { RouterStoreModule } from '@sofipay/router-store';
import { AuthenticationService } from './services/authentication.service';
import { RoleService } from './services/role.service';
import { AuthenticatedGuard, TOKEN_KEY } from './guards/authenticated.guard';
import { PermissionGuard } from './guards/permission.guard';
import { JwtModule } from '@auth0/angular-jwt';

registerLocaleData(localeFr);

export function tokenGetter() {
  return localStorage.getItem(TOKEN_KEY);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:8949'],
        disallowedRoutes: ['']
      }
    })),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore(),
    provideAngularSvgIcon(),
    DecimalPipe,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    importProvidersFrom(RouterStoreModule, NotificationsStoreModule),
    AuthenticationService,
    RoleService,
    AuthenticatedGuard,
    PermissionGuard
  ]
};
