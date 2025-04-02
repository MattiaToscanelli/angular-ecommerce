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
    // Gestisci il ritorno da Okta se siamo nel callback
    if (window.location.pathname === '/login/callback') {
      this.oktaAuth.handleLoginRedirect().then(() => {
        // Dopo aver gestito il login redirect, naviga alla home
        this.router.navigate(['/']);
      }).catch(err => {
        console.error('Errore nel gestire il login redirect:', err);
      });
      return;
    }

    // Se non siamo nel callback, controlliamo se l'utente è già autenticato
    this.oktaAuth.isAuthenticated().then(authenticated => {
      if (authenticated) {
        // Se l'utente è già autenticato, naviga alla home
        this.router.navigate(['/']);
      } else {
        // Se l'utente non è autenticato, mostra il widget di login Okta
        this.oktaSignIn.renderEl(
          { el: '#okta-sign-in-widget' },
          (response: any) => {
            if (response.status === 'SUCCESS') {
              // Gestisci il login direttamente senza signInWithRedirect
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
