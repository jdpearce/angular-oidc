import { Injectable, Inject } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    constructor(private userManager: UserManager, private router: Router) { }

    getUser(): Observable<Oidc.User> {
        return fromPromise(this.userManager.getUser());
    }

    startAuthentication(args?: any): Observable<any> {
        return fromPromise(this.userManager.signinRedirect(args));
    }

    isLoggedIn(): Observable<boolean> {
        return this.getUser().pipe(map(user => Boolean(user && !user.expired)));
    }

    completeAuthentication(): Observable<User> {
        return fromPromise(this.userManager.signinRedirectCallback());
    }
}
