import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninOidcComponent } from './signin-oidc/signin-oidc.component';
import { LoginPopupComponent } from './login-popup/login-popup.component';

const routes: Routes = [{ 
    path: 'signin-oidc', 
    component: SigninOidcComponent
}, {
    path: 'login-popup/:login_hint',
    component: LoginPopupComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [SigninOidcComponent, LoginPopupComponent]
})
export class AngularOidcRoutingModule {}
