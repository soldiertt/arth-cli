import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Auth0Service} from "../../shared/service/auth.service";
import {Injectable} from "@angular/core";
import {UserRestService} from '../../shared/service/rest/user.rest.service';
import {SessionService} from '../../shared/service/session.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private auth0Service: Auth0Service,
              private sessionService: SessionService,
              private userRestService: UserRestService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth0Service.authenticated()) {
      const userId = this.sessionService.getProfile().user_id;
      return this.userRestService.getUser(userId).map(profile => profile.app_metadata.roles.indexOf('admin') !== -1);
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
