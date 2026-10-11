import {Component, OnInit, inject, ChangeDetectionStrategy} from '@angular/core';
import {Auth0Service} from '../../../shared/service/auth.service';

@Component({
    selector: 'arth-auth-callback',
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: 'auth-callback.component.html'
})
export class AuthCallbackComponent implements OnInit {
  private auth0Service = inject(Auth0Service);


  ngOnInit() {
    this.auth0Service.handleAuthentication();
  }
}
