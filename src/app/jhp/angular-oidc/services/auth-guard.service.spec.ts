import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthService, AuthGuardService } from '.';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, RouterState } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

describe('AuthGuardService', () => {
    let service: AuthGuardService;

    const mockAuthService = {
        isLoggedIn: jasmine.createSpy('isLoggedIn'),
        startAuthentication: jasmine.createSpy('startAuthentication')
    };

    const mockRouteSnapshot = {
        url: '/fakeurl'
    };

    const mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                providers: [
                    AuthGuardService,
                    { provide: ActivatedRouteSnapshot, useValue: mockRouteSnapshot },
                    { provide: AuthService, useValue: mockAuthService },
                ]
            }).compileComponents();

            mockAuthService.isLoggedIn.calls.reset();
            mockAuthService.startAuthentication.calls.reset();
        })
    );

    it('should be creatable', () => {
        service = TestBed.get(AuthGuardService);
        expect(service).toBeTruthy();
    });

    it('should start authentication process if user IS NOT logged in', fakeAsync(() => {
        mockAuthService.isLoggedIn.and.returnValue(Observable.from([false]));
        const snapshot = TestBed.get(ActivatedRouteSnapshot);
        service.canActivate(null, snapshot).subscribe(result => {
            expect(mockAuthService.isLoggedIn).toHaveBeenCalled();
            expect(mockAuthService.startAuthentication).toHaveBeenCalledWith({ state: { target: mockRouteSnapshot.url }});
            expect(result).toBeFalsy();
        });
        tick();
    }));

    it('should NOT start authentication process if user IS logged in', fakeAsync(() => {
        mockAuthService.isLoggedIn.and.returnValue(Observable.from([true]));
        const snapshot = TestBed.get(ActivatedRouteSnapshot);
        service.canActivate(null, snapshot).subscribe(result => {
            expect(mockAuthService.isLoggedIn).toHaveBeenCalled();
            expect(mockAuthService.startAuthentication).not.toHaveBeenCalled();
            expect(result).toBeTruthy();
        });
        tick();
    }));
});
