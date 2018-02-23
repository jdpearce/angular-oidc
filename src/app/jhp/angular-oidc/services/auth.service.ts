import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class AuthService {

    private user: User;
    private manager = new UserManager(getClientSettings());

    getUser(): Observable<Oidc.User> {
        return fromPromise(this.manager.getUser());
    }

    isLoggedIn(): boolean {
        console.log(this.user);
        return this.user != null && !this.user.expired;
    }

    getClaims(): any {
        return this.user.profile;
    }

    startAuthentication(): Promise<void> {
        return this.manager.signinRedirect();
    }

    completeAuthentication(): Promise<void> {
        return this.manager.signinRedirectCallback().then(user => {
            this.user = user;
        });
    }
}

export function getClientSettings(): UserManagerSettings {
    return {
        authority: 'https://demo.identityserver.io/',
        client_id: 'implicit.reference',
        redirect_uri: 'http://localhost:4200/auth-callback',
        response_type: 'id_token token',
        scope: 'openid profile api',
        filterProtocolClaims: true,
        loadUserInfo: false
    };
}
