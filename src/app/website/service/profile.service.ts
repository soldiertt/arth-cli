import {Injectable} from "@angular/core";
import {SessionService} from "../../shared/service/session.service";
import UserProfile from '../model/user-profile.class';
import {Router} from '@angular/router';
import {Auth0Service} from '../../shared/service/auth.service';
import UserMetaData from '../model/usermetadata.class';
import {Store} from '@ngrx/store';
import {ProfileActions} from '../../root/actions/user-profile.actions';

@Injectable()
export class ProfileService {

  constructor(private sessionService: SessionService,
              private auth0Service: Auth0Service,
              private store: Store<UserProfile>,
              private router: Router) {

    this._authCallback();
  }

  public login(event: any, callbackFn?: Function) {
    event.preventDefault();
    if (callbackFn) {
      this.auth0Service.defineLock();
      this._authCallback(callbackFn);
    }
    this.auth0Service.login();
  };

  logout($event) {
    $event.preventDefault();
    this.store.dispatch(new ProfileActions.Logout());
    if (this.router.url.indexOf('/profile') != -1 || this.router.url.indexOf('/mycart') != -1) {
      this.router.navigate(['/']);
    }
  }

  private _authCallback(extraCallbackFn?: Function) {
    this.auth0Service.lock.on("authenticated", (authResult: any) => {
      this.sessionService.saveIdToken(authResult.idToken);
      this.auth0Service.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          console.log(error);
          return;
        }

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
          this.store.dispatch(new ProfileActions.UpdateMetadata(profile.user_id, metaData));
        } else {
          this.store.dispatch(new ProfileActions.Set(profile));
          this.store.dispatch(new ProfileActions.SaveToSession());
        }

        if (extraCallbackFn) {
          extraCallbackFn();
        }
      });
    });
  }

}
