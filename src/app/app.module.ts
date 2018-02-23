import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularOidcModule } from './jhp/angular-oidc/angular-oidc.module';
import { ProtectedComponent } from './protected/protected.component';
import { AppRoutingModule } from './app-routing.module';


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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
