import {Component, OnInit} from '@angular/core';
import {Auth0Service} from '../../../shared/service/auth.service';

@Component({
  selector: 'arth-auth-callback',
  templateUrl: 'auth-callback.component.html'
})
export class AuthCallbackComponent implements OnInit {

  constructor(private auth0Service: Auth0Service) {}

  ngOnInit() {
    this.auth0Service.handleAuthentication();
  }
}
