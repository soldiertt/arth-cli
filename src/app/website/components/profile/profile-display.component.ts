import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import UserProfile from '../../model/user-profile.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {FromProfile} from '../../../root/reducers/user-profile.reducer';
import { AsyncPipe } from '@angular/common';
import { I18nPipe } from '../../../shared/i18n/i18n.pipe';

@Component({
    selector: 'arth-profile-display',
    templateUrl: 'profile-display.component.html',
    imports: [AsyncPipe, I18nPipe]
})
export class ProfileDisplayComponent implements OnInit {
  private store = inject<Store<UserProfile>>(Store);


  userProfile$: Observable<UserProfile>;

  @Output() edit: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
    this.userProfile$ = this.store.select(FromProfile.selectLocalState);
  }

  editContactInfo(): void {
    this.edit.emit('contactinfo');
  }

}
