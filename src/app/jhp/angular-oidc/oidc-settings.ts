import { InjectionToken } from "@angular/core";

export const OIDC_SETTINGS = new InjectionToken<OidcSettings>('OidcSettings');

export interface OidcSettings {
    authority: string;
    app_root?: string;
    client_id: string;
    logout_route?: string;
    response_type?: string;
    scope: string;
    revokeAccessTokenOnSignout?: boolean;
    filterProtocolClaims?: boolean;
    loadUserInfo?: boolean;
    monitorSession?: boolean;
    staleStateAge?: number;
}
