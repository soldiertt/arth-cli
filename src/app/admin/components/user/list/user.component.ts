import {Component, inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import UserProfile from '../../../../website/model/user-profile.class';
import {UserActions} from '../../../actions/user.actions';
import {FromAdminUser} from '../../../reducers/user.reducer';
import {AsyncPipe, DatePipe} from '@angular/common';

@Component({
    templateUrl: './user.component.html',
    imports: [AsyncPipe, DatePipe]
})
export class UserComponent implements OnInit {
  private store = inject<Store<FromAdminUser.State>>(Store);

  users$: Observable<UserProfile[]>;

  ngOnInit() {
    this.getAll();
  }

  private getAll() {
    this.users$ = this.store.select(FromAdminUser.selectAll);
    this.store.dispatch(UserActions.GetAll());
  }

}
