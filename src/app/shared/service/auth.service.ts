import {Injectable} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';
import {I18nService} from './i18n.service';
import {ArthuriusEventsService} from './arthurius-events.service';

@Injectable()
export class Auth0Service {

  lock: any;
  options: any;

  constructor(private i18nService: I18nService,
              private eventsService: ArthuriusEventsService) {
    this.eventsService.languageChanged.subscribe(lang => {
      this._initLock(lang);
    });
    const language = this.i18nService.currentLanguage;
    this._initLock(language);
  }

  private _initLock(language: string) {
    this.options = {
      auth: {
        redirect: false,
        params: {
          scope: 'openid name nickname email picture'
        }
      },
      autoclose: true,
      language: language,
      languageDictionary: {
        title: 'Arthurius'
      },
      theme: {
        logo: 'assets/images/arth-logo.png'
      }
    };

    this.defineLock();
  }

  defineLock() {
    this.lock = new Auth0Lock('FagjAgAPouOSSHFFrAbAs5Z5E60KVmGD', 'soldiertt.eu.auth0.com', this.options);
  }

  login() {
    this.lock.show();
  }

  authenticated() {
    return tokenNotExpired('id_token');
  }

}
