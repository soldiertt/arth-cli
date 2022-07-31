import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import * as auth0 from 'auth0-js';
import {AuthActions} from '../../root/actions/auth.actions';
import {ProfileActions} from '../../root/actions/user-profile.actions';
import UserProfile from '../../website/model/user-profile.class';
import UserMetaData from '../../website/model/usermetadata.class';

(window as any).global = window;

@Injectable()
export class Auth0Service {

  auth0 = new auth0.WebAuth({
    clientID: 'FagjAgAPouOSSHFFrAbAs5Z5E60KVmGD',
    domain: 'soldiertt.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: environment.redirecturl,
    scope: 'openid'
  });

  constructor(public router: Router,  private store: Store<UserProfile>) { }

  handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.store.dispatch(AuthActions.SaveToSession({authResult}));
        this.getProfile(authResult.accessToken, (errP, profile) => {
          if (errP) {
            console.log(errP);
          }
          window.location.hash = '';
          this.router.navigate(['/']);
        });
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  login($event?) {
    if ($event) {
      $event.preventDefault();
    }
    this.auth0.authorize();
  }

  logout($event?): void {
    if ($event) {
      $event.preventDefault();
    }
    this.store.dispatch(ProfileActions.Logout());
    if (this.router.url.indexOf('/profile') !== -1 || this.router.url.indexOf('/mycart') !== -1) {
      this.router.navigate(['/']);
    }
  }

  authenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  private getProfile(accessToken, extraCallbackFn?: Function) {

    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        let metaData = profile.user_metadata;
        let needUpdate: boolean = false;

        if (!metaData) {
          metaData = new UserMetaData();
          needUpdate = true;
        }
        if (!metaData.email) {
          metaData.email = profile['email'];
          needUpdate = true;
        }
        if (!metaData.name && profile['identities'][0]['isSocial'] === true) {
          metaData.name = profile['name'];
          needUpdate = true;
        }

        if (needUpdate) {
          this.store.dispatch(ProfileActions.UpdateMetadata({userId: profile.user_id, metadata: metaData}));
        } else {
          this.store.dispatch(ProfileActions.Set({profile: new UserProfile(profile)}));
          this.store.dispatch(ProfileActions.SaveToSession());
        }

        if (extraCallbackFn) {
          extraCallbackFn(err, profile);
        }
      }
    });
  }

}
