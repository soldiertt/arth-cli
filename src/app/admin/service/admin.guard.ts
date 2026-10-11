import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Auth0Service} from '../../shared/service/auth.service';
import {UserRestService} from '../../shared/service/rest/user.rest.service';
import {SessionService} from '../../shared/service/session.service';

export const adminGuard: CanActivateFn = () => {
  const auth0Service = inject(Auth0Service);
  const sessionService = inject(SessionService);
  const userRestService = inject(UserRestService);
  const router = inject(Router);

  if (auth0Service.authenticated()) {
    const userId = sessionService.getProfile().user_id;
    return userRestService.getUser(userId).pipe(map(profile => profile.app_metadata.roles.indexOf('admin') !== -1));
  }
  router.navigate(['/']);
  return false;
};
