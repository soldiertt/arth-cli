import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromUser from '../../../reducers/user.reducer';
import * as actions from '../../../actions/user.actions';
import UserProfile from '../../../../website/model/user-profile.class';

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  users$: Observable<UserProfile[]>;

  constructor(private store: Store<fromUser.State>) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.users$ = this.store.select(fromUser.selectAll);
    this.store.dispatch(new actions.GetAll());
  }

}
