import {Component, EventEmitter, Output, OnInit} from "@angular/core";
import UserProfile from '../../model/user-profile.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromProfile from '../../../root/reducers/user-profile.reducer';

@Component({
  selector: 'arth-profile-display',
  templateUrl: 'profile-display.component.html'
})
export class ProfileDisplayComponent implements OnInit {

  userProfile$: Observable<UserProfile>;

  @Output() edit: EventEmitter<string> = new EventEmitter();

  constructor(private store: Store<UserProfile>) {}

  ngOnInit() {
    this.userProfile$ = this.store.select(fromProfile.selectLocalState);
  }

  editContactInfo(): void {
    this.edit.emit('contactinfo');
  }

}
