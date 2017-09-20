import {Injectable} from "@angular/core";
import {SessionService} from "./session.service";
import {DataService} from './data.service';
import {Actions} from '../model/actions.class';
import UserProfile from '../model/user-profile.class';

@Injectable()
export class ProfileService {

  constructor(private sessionService: SessionService, private dataService: DataService) {
    let sessionProfile = this.sessionService.getProfile();
    if (sessionProfile) {
      this.dataService.doAction(Actions.SET_PROFILE, sessionProfile);
    }
    this.dataService.appData.subscribe(appData => {
      this.sessionService.saveProfile(appData.profile);
    });
  }

  saveIdToken(idToken) {
    this.sessionService.saveIdToken(idToken);
  }

  updateProfile(profile: UserProfile) {
    this.dataService.doAction(Actions.SET_PROFILE, profile);
  }

  logout() {
    this.sessionService.deleteIdToken();
    this.dataService.doAction(Actions.SET_PROFILE, undefined);
  }
}
