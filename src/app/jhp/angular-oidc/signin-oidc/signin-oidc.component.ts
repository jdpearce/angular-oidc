import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services';
import { Router } from '@angular/router';
import { User } from 'oidc-client';

@Component({
    template: ''
})
export class SigninOidcComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.authService.completeAuthentication().subscribe(user => {
            if (user && user.state && user.state.target) {
                this.router.navigate([user.state.target]);
            }
        });
    }
}
