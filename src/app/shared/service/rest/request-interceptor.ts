import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SessionService} from '../session.service';
import {Auth0Service} from '../auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService, private auth0Service: Auth0Service) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const userId = this.getUserId();

    if (userId) {
      request = request.clone({
        setHeaders: {
          'X-Arth-UserId': this.getUserId()
        }
      });
    }

    return next.handle(request);
  }

  private getUserId(): string {
    if (this.auth0Service.authenticated()) {
      const profile = this.sessionService.getProfile();
      if (profile) {
        return profile.user_id;
      }
    }
    return undefined;
  }
}
