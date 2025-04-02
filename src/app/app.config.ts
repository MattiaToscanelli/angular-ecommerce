import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import myAppConfig from './config/my-app-config';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(OktaAuthModule),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    {
      provide: OKTA_CONFIG,
      useValue: {
        oktaAuth: new OktaAuth(myAppConfig.oidc),
      }
    }
  ]
};
