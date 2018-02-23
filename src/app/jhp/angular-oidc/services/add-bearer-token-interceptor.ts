import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AddBearerTokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    private isApiCall(url: string): boolean {
        return url.toLowerCase().startsWith('/api/');
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isApiCall(req.url)) {
            return next.handle(req);
        }

        return this.authService.getUser().mergeMap(user => {
            let request = req;
            if (user) {
                request = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${user.access_token}`
                    }
                });
            }

            return next.handle(request);
        });
    }
}
