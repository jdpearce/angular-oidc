import { OidcSettings } from ".";

// Add to your providers
// providers: [...{
//     provide: OIDC_SETTINGS,
//     useValue: {...}
// }]
//

export const ExampleOidcSettings: OidcSettings = {
    authority: 'https://demo.identityserver.io/',
    app_root: 'v2', //something like the base_href (could potentially use this?)
    client_id: 'implicit.reference',
    response_type: 'id_token token',
    scope: 'openid profile api',
    revokeAccessTokenOnSignout: true,
    filterProtocolClaims: true,
    loadUserInfo: true,
    monitorSession: false,
    staleStateAge: 30
};
