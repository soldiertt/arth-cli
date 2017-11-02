import {Injectable} from "@angular/core";
import {SessionService} from "../../shared/service/session.service";
import {DataService} from './data.service';
import {Actions} from '../model/actions.class';
import UserProfile from '../model/user-profile.class';
import {Router} from '@angular/router';
import {Auth0Service} from '../../shared/service/auth.service';
import UserMetaData from '../model/usermetadata.class';
import {UserRestService} from '../../shared/service/rest/user.rest.service';

@Injectable()
export class ProfileService {

  constructor(private sessionService: SessionService,
              private auth0Service: Auth0Service,
              private userRestService: UserRestService,
              private dataService: DataService,
              private router: Router) {
    let sessionProfile = this.sessionService.getProfile();
    if (sessionProfile) {
      this.dataService.doAction(Actions.SET_PROFILE, sessionProfile);
    }
    this._authCallback();
  }

  updateProfile(profile: UserProfile) {
    this.dataService.doAction(Actions.SET_PROFILE, profile);
    this.sessionService.saveProfile(profile);
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
    this.sessionService.deleteIdToken();
    this.sessionService.deleteProfile();
    this.dataService.doAction(Actions.SET_PROFILE, undefined);
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
        if (!metaData) {
          metaData = new UserMetaData();
        }
        if (!metaData.email) {
          metaData.email = profile['email'];
        }
        if (!metaData.name && profile['identities'][0]['isSocial'] === true) {
          metaData.name = profile['name'];
        }
        profile.user_metadata = metaData;
        this.userRestService.updateProfile(profile.user_id, profile.user_metadata).subscribe(_ => {
          console.log("Profile saved");
        });

        this.sessionService.saveProfile(profile);
        this.dataService.doAction(Actions.SET_PROFILE, profile);
        if (extraCallbackFn) {
          extraCallbackFn();
        }
      });
    });
  }

}
