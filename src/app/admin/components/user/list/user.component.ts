import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import UserProfile from '../../../../website/model/user-profile.class';
import {UserActions} from '../../../actions/user.actions';
import {FromAdminUser} from '../../../reducers/user.reducer';
import { NgFor, NgIf, AsyncPipe, DatePipe } from '@angular/common';

@Component({
    templateUrl: './user.component.html',
    imports: [NgFor, NgIf, AsyncPipe, DatePipe]
})
export class UserComponent implements OnInit {

  users$: Observable<UserProfile[]>;

  constructor(private store: Store<FromAdminUser.State>) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.users$ = this.store.select(FromAdminUser.selectAll);
    this.store.dispatch(UserActions.GetAll());
  }

}
