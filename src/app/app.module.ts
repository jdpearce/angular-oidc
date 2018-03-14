import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularOidcModule, OIDC_SETTINGS } from './jhp/angular-oidc';
import { ProtectedComponent } from './protected/protected.component';
import { AppRoutingModule } from './app-routing.module';
import { AppOidcSettings } from './app-oidc-settings';
import { PopupComponent } from './protected/popup.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [AppComponent, ProtectedComponent, PopupComponent],
    imports: [BrowserModule, AppRoutingModule, AngularOidcModule, NgbModule.forRoot()],
    providers: [
        {
            provide: OIDC_SETTINGS,
            useValue: AppOidcSettings
        }
    ],
    entryComponents: [PopupComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
