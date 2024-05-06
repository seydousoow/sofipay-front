import { appRoutes } from './app.routes';

import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { provideStore } from '@ngrx/store';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideHttpClient } from '@angular/common/http';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore(),
    provideAngularSvgIcon(),
    DecimalPipe,
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ]
};
