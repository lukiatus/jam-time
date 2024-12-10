import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { MAT_ICON_DEFAULT_OPTIONS } from '@angular/material/icon';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { AuthService } from './core/services/auth/auth.service';
import { SettingsService } from './core/services/settings/settings.service';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { ErrorHandlerService } from './core/services/error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([tokenInterceptor, errorInterceptor]),
    ),
    {
      provide: MAT_ICON_DEFAULT_OPTIONS,
      useValue: {fontSet: 'material-symbols-outlined'}
    },
    provideAppInitializer(() => (inject(AuthService).loadUserData())),
    provideAppInitializer(() => (inject(SettingsService).initialize())),
    ErrorHandlerService
  ]
};
