import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularOidcRoutingModule } from './angular-oidc-routing.module';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { 
    AddBearerTokenInterceptor, 
    AuthGuardService, 
    AuthService 
} from './services';

@NgModule({
  imports: [CommonModule, AngularOidcRoutingModule],
  declarations: [AuthCallbackComponent],
  providers: [
    AuthGuardService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddBearerTokenInterceptor,
      multi: true
    }
  ]
})
export class AngularOidcModule {}
