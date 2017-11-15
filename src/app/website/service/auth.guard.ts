import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Auth0Service} from '../../shared/service/auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth0Service: Auth0Service, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth0Service.authenticated()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
