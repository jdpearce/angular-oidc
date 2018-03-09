import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularOidcModule, OIDC_SETTINGS } from './jhp/angular-oidc';
import { ProtectedComponent } from './protected/protected.component';
import { AppRoutingModule } from './app-routing.module';
import { AppOidcSettings } from './app-oidc-settings';


@NgModule({
  declarations: [
    AppComponent,
    ProtectedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularOidcModule
  ],
  providers: [,
    {
        provide: OIDC_SETTINGS,
        useValue: AppOidcSettings
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
