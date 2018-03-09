import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularOidcRoutingModule } from './angular-oidc-routing.module';
import { 
    AddBearerTokenInterceptor, 
    AuthGuardService, 
    AuthService 
} from './services';
import { UserManager, UserManagerSettings } from 'oidc-client';
import { OidcSettings, OIDC_SETTINGS } from './oidc-settings';
import { AuthSettingsService } from './services/auth-settings.service';

@NgModule({
  imports: [CommonModule, AngularOidcRoutingModule],
  providers: [
    AuthGuardService,
    AuthService,
    AuthSettingsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddBearerTokenInterceptor,
      multi: true
    },
    {
        provide: UserManager,
        useFactory: (authSettings: AuthSettingsService) => new UserManager(authSettings.getSettings()),
        deps: [AuthSettingsService]
    }
  ]
})
export class AngularOidcModule {}
