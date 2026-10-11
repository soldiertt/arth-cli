import {inject} from '@angular/core';
import {HttpInterceptorFn} from '@angular/common/http';
import {SessionService} from '../session.service';
import {Auth0Service} from '../auth.service';

export const requestInterceptor: HttpInterceptorFn = (request, next) => {
  const sessionService = inject(SessionService);
  const auth0Service = inject(Auth0Service);

  const userId = getUserId(auth0Service, sessionService);

  if (userId) {
    request = request.clone({
      setHeaders: {
        'X-Arth-UserId': userId
      }
    });
  }

  return next(request);
};

function getUserId(auth0Service: Auth0Service, sessionService: SessionService): string {
  if (auth0Service.authenticated()) {
    const profile = sessionService.getProfile();
    if (profile) {
      return profile.user_id;
    }
  }
  return undefined;
}
