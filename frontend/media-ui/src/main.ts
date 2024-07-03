import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authConfig } from './app/auth/auth.config';
import { provideAuth } from 'angular-auth-oidc-client';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideAnimationsAsync(), provideAuth(authConfig),
    importProvidersFrom(RouterModule.forRoot(routes))
  ]
})
.catch(err => console.error(err));
