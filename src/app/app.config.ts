import { appRoutes } from './app.routes';

import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { provideStore } from '@ngrx/store';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideHttpClient } from '@angular/common/http';
import { NotificationsStoreModule } from '@sofitay/notifications';
import { RouterStoreModule } from '@sofitay/router-store';
import { AuthenticationService } from './services/authentication.service';
import { RoleService } from './services/role.service';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { PermissionGuard } from './guards/permission.guard';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
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
