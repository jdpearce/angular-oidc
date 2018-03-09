import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from 'oidc-client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/empty'
import { AuthSettingsService } from '../services/auth-settings.service';

@Component({
    template: ''
})
export class LoginPopupComponent implements OnInit {

    constructor(private authService: AuthService, private route: ActivatedRoute, private authSettings: AuthSettingsService) {}

    ngOnInit(): void {
        this.route.paramMap.switchMap(params => {

            this.authService.startAuthentication({
                login_hint: params.get('login_hint'),
                extraQueryParams: {midsession: true},
                redirect_uri: `${this.authSettings.getRootUrl()}${this.authSettings.getAppRoot()}/signin-oidc-popup`
            });

            return Observable.empty();
        });
    }
}
