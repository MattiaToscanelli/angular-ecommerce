export default {
    oidc : {
        clientId: 'test',
        issuer: 'https://<<ADD-YOUR-DEV-DOMAIN>>/oauth2/default',
        redirectUri: 'http://localhost:4200/login/callback',
        scopes: ['openid', 'profile', 'email'],
    }
}
