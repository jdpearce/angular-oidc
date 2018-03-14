import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddBearerTokenInterceptor } from './add-bearer-token-interceptor';
import { HTTP_INTERCEPTORS, HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { AuthService } from '.';

describe(`AddBearerTokenInterceptor`, () => {
    let http: HttpClient;
    let httpMock: HttpTestingController;

    const mockAuthService = {
        getUser: jasmine.createSpy('getUser')
    };

    const dummyUser = {
        token_type: 'Bearer',
        access_token: '==dummyToken'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AddBearerTokenInterceptor,
                    multi: true
                }
            ]
        });

        mockAuthService.getUser.and.returnValue(Observable.from([dummyUser]));
        http = TestBed.get(HttpClient);
        httpMock = TestBed.get(HttpTestingController);
    });

    ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].forEach((method: string) => {
        describe(`when making a ${method} request`, () => {
            it('should add the bearer token authorization header to API requests', () => {
                const url = '/api/data';

                http.request(method, url).subscribe(response => {
                    expect(response).toBeTruthy();
                });

                const testRequest = httpMock.expectOne(request => {
                    return (
                        request.method === method &&
                        request.headers.has('Authorization') &&
                        request.headers.get('Authorization') ===
                            `${dummyUser.token_type} ${dummyUser.access_token}`
                    );
                });

                testRequest.flush({ hello: 'world' });
                httpMock.verify();
            });

            it('should not add the bearer token to non-API calls', () => {
                const url = 'https://api.postcodes.io/postcodes/N194SZ';

                http.request(method, url).subscribe(response => {
                    expect(response).toBeTruthy();
                });

                const testRequest = httpMock.expectOne(request => {
                    return request.method === method && !request.headers.has('Authorization');
                });

                testRequest.flush({ hello: 'world' });
                httpMock.verify();
            });
        });
    });

    it('should add the bearer token authorization header to userinfo endpoint requests', () => {
        const url = '/connect/userinfo';

        http.request('GET', url).subscribe(response => {
            expect(response).toBeTruthy();
        });

        const testRequest = httpMock.expectOne(request => {
            return (
                request.method === 'GET' &&
                request.headers.has('Authorization') &&
                request.headers.get('Authorization') ===
                    `${dummyUser.token_type} ${dummyUser.access_token}`
            );
        });

        testRequest.flush({ hello: 'world' });
        httpMock.verify();
    });
});
