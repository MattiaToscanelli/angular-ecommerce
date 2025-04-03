import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaSignIn from '@okta/okta-signin-widget';
import { Router } from '@angular/router';
import myAppConfig from '../../config/my-app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignIn: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
              private router: Router) {
    this.oktaSignIn = new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      useClassicEngine: true,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes,
      },
    });
  }

  ngOnInit(): void {
  
    if (window.location.pathname === '/login/callback') {
      this.oktaAuth.handleLoginRedirect().then(() => {
        this.router.navigate(['/']);
      }).catch(err => {
        console.error('Errore nel gestire il login redirect:', err);
      });
      return;
    }

    this.oktaAuth.isAuthenticated().then(authenticated => {
      if (authenticated) {
        this.router.navigate(['/']);
      } else {
        this.oktaSignIn.renderEl(
          { el: '#okta-sign-in-widget' },
          (response: any) => {
            if (response.status === 'SUCCESS') {
              this.oktaAuth.tokenManager.setTokens(response.tokens);
              this.oktaSignIn.remove();
              this.router.navigate(['/']);

              // TODO: TEST with Https
              // this.oktaAuth.signInWithRedirect();
            }
          },
          (err: any) => {
            console.error('Errore nel widget Okta:', err);
          }
        );
      }
    });
  }
}
