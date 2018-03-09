import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { UserManagerSettings } from 'oidc-client';
import { OIDC_SETTINGS, OidcSettings } from '../oidc-settings';

export class AuthSettingsService {
    constructor(
        @Inject(OIDC_SETTINGS) private baseSettings: OidcSettings,
        @Inject(DOCUMENT) private document: any
    ) {}

    getAppRoot(): string {
        return this.baseSettings.app_root? `/${this.baseSettings.app_root}` : '';
    }


    getRootUrl(): string {
        const location = document.location;
        const protocol = location.protocol;
        const host = location.host;

        let url = `${protocol}//${host}`;
        return url;
    }

    getSettings(): Oidc.UserManagerSettings {
        const siteRoot: string = this.getRootUrl();

        const settings: Oidc.UserManagerSettings = {
            authority: this.baseSettings.authority || siteRoot,
            client_id: this.baseSettings.client_id,
            redirect_uri: `${siteRoot}${this.getAppRoot()}/signin-oidc`,
            response_type: this.baseSettings.response_type || 'id_token token',
            scope: this.baseSettings.scope,
            post_logout_redirect_uri: `${siteRoot}${this.baseSettings.logout_route}`,

            revokeAccessTokenOnSignout: this.baseSettings.revokeAccessTokenOnSignout,
            filterProtocolClaims: this.baseSettings.filterProtocolClaims,
            loadUserInfo: this.baseSettings.loadUserInfo,
            monitorSession: this.baseSettings.monitorSession,
            staleStateAge: this.baseSettings.staleStateAge
        };

        return settings;
    }
}
