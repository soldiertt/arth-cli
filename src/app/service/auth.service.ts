// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import {Router} from "@angular/router";
import Auth0Lock from 'auth0-lock';
import {I18nService} from "../i18n/i18n.service";
import {ArthuriusEventsService} from "./arthurius-events.service";
import UserMetaData from "../model/usermetadata.class";
import {UserRestService} from "./user.rest.service";
import {ProfileService} from './profile.service';

@Injectable()
export class Auth0Service {

  lock: any;

  constructor(private router: Router,
              private profileService: ProfileService,
              private i18nService: I18nService,
              private userRestService: UserRestService,
              private eventsService: ArthuriusEventsService) {
    this.eventsService.languageChanged.subscribe(language => {
      this._initLock(language);
    });
    let language = this.i18nService.currentLanguage;
    this._initLock(language);
  }

  private _initLock(language: string) {
    let options = {
      auth: {
        redirect: false,
        params: {
          scope: 'openid name nickname email picture'
        }
      },
      autoclose: true,
      language: language,
      languageDictionary: {
        title: "Arthurius"
      },
      theme: {
        logo: 'assets/images/arth-logo.png'
      }
    };

    this.lock = new Auth0Lock('FagjAgAPouOSSHFFrAbAs5Z5E60KVmGD', 'soldiertt.eu.auth0.com', options);

    this._authCallback();
  }

  private _authCallback(extraCallbackFn?: Function) {
    this.lock.on("authenticated", (authResult: any) => {
      this.profileService.saveIdToken(authResult.idToken);
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          console.log(error);
          return;
        }
        // Pref-fill user_metadata
        if (!profile.user_metadata) {
          let metaData = new UserMetaData();
          metaData.email = profile['email'];
          if (profile['identities'][0]['isSocial'] === true) {
            metaData.name = profile['name'];
          }
          profile.user_metadata = metaData;
          this.userRestService.updateProfile(profile.user_id, profile.user_metadata).subscribe(result => {
            console.log("Profile saved in Auth0");
          });
        }
        this.profileService.updateProfile(profile);
        if (extraCallbackFn) {
          extraCallbackFn();
        }
      });
    });
  }

  public login(event: any, callbackFn?: Function) {
    event.preventDefault();
    if (callbackFn) {
      this._authCallback(callbackFn);
    }
    this.lock.show();
  };

  public authenticated() {
    return tokenNotExpired('id_token');
  };

  public logout(event: any) {
    event.preventDefault();
    this.profileService.logout();
    if (this.router.url.indexOf('/profile') != -1 || this.router.url.indexOf('/mycart') != -1) {
      this.router.navigate(['/']);
    }
  };
}
