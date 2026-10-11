import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {Auth0Service} from '../../shared/service/auth.service';
import { Injectable, inject } from '@angular/core';

@Injectable()
export class AuthGuard  {
  private auth0Service = inject(Auth0Service);
  private router = inject(Router);


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth0Service.authenticated()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
