import { PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
            authority: 'dev-wtnybo1q5wcqpihj.us.auth0.com',
            redirectUrl: window.location.origin,
            clientId: 'QZsnLzbzM3NKvHr39y0l1Ul07GzuWSJ4',
            scope: 'openid profile offline_access',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
        }
}
