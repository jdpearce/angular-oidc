import { OidcSettings } from "./jhp/angular-oidc";

export const AppOidcSettings: OidcSettings = {
    authority: 'https://demo.identityserver.io/',
    // app_root: 'v2', 
    client_id: 'implicit.reference',
    response_type: 'id_token token',
    scope: 'openid profile api',
    filterProtocolClaims: true,
    loadUserInfo: false
};
