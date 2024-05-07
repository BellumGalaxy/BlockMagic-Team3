import { ApplicationConfig } from '@angular/core';
import { TitleStrategy, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { OTPagesStrategy } from './strategies/titles/ot-pages.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    {
      provide: TitleStrategy,
      useClass: OTPagesStrategy,
    },
  ],
};
