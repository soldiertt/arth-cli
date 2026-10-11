import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {Auth0Service} from '../../shared/service/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth0Service = inject(Auth0Service);
  const router = inject(Router);

  if (auth0Service.authenticated()) {
    return true;
  }
  router.navigate(['/']);
  return false;
};
