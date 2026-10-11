import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import UserProfile from '../../model/user-profile.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {FromProfile} from '../../../root/reducers/user-profile.reducer';
import { NgIf, AsyncPipe } from '@angular/common';
import { I18nPipe } from '../../../shared/i18n/i18n.pipe';

@Component({
    selector: 'arth-profile-display',
    templateUrl: 'profile-display.component.html',
    imports: [NgIf, AsyncPipe, I18nPipe]
})
export class ProfileDisplayComponent implements OnInit {

  userProfile$: Observable<UserProfile>;

  @Output() edit: EventEmitter<string> = new EventEmitter();

  constructor(private store: Store<UserProfile>) {}

  ngOnInit() {
    this.userProfile$ = this.store.select(FromProfile.selectLocalState);
  }

  editContactInfo(): void {
    this.edit.emit('contactinfo');
  }

}
