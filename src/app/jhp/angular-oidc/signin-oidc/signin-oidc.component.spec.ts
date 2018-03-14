import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SigninOidcComponent } from './signin-oidc.component';
import { AuthService } from '..';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

describe('SigninOidcComponent', () => {
    let component: SigninOidcComponent;

    const mockRouter = {
        navigate: jasmine.createSpy('navigate')
    };

    const mockAuthService = {
        completeAuthentication: jasmine.createSpy('completeAuthentication')
    };

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                providers: [
                    SigninOidcComponent,
                    { provide: AuthService, useValue: mockAuthService },
                    { provide: Router, useValue: mockRouter }
                ]
            }).compileComponents();

            mockAuthService.completeAuthentication.calls.reset();
        })
    );

    it('should be creatable', () => {
        component = TestBed.get(SigninOidcComponent);
        expect(component).toBeTruthy();
    });

    it('should complete auth on init', () => {
        component = TestBed.get(SigninOidcComponent);
        const dummyUserWithoutState = {};
        mockAuthService.completeAuthentication.and.returnValue(Observable.from([dummyUserWithoutState]));
        component.ngOnInit();
        expect(mockAuthService.completeAuthentication).toHaveBeenCalled();
    });

    it('should navigate to state target after completing auth', () => {
        component = TestBed.get(SigninOidcComponent);
        const dummyUserWithState = { state: { target: 'dummy'} };
        mockAuthService.completeAuthentication.and.returnValue(Observable.from([dummyUserWithState]));
        component.ngOnInit();
        expect(mockRouter.navigate).toHaveBeenCalledWith([dummyUserWithState.state.target]);
    });
});
