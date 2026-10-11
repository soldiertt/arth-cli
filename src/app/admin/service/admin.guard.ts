
import {map} from 'rxjs/operators';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {Auth0Service} from '../../shared/service/auth.service';
import { Injectable, inject } from '@angular/core';
import {UserRestService} from '../../shared/service/rest/user.rest.service';
import {SessionService} from '../../shared/service/session.service';

@Injectable()
export class AdminGuard  {
  private auth0Service = inject(Auth0Service);
  private sessionService = inject(SessionService);
  private userRestService = inject(UserRestService);
  private router = inject(Router);


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth0Service.authenticated()) {
      const userId = this.sessionService.getProfile().user_id;
      return this.userRestService.getUser(userId).pipe(map(profile => profile.app_metadata.roles.indexOf('admin') !== -1));
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
