
import {takeUntil} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {FormComponent} from '../form.component';
import UserMetaData from '../../model/usermetadata.class';
import UserProfile from '../../model/user-profile.class';
import {Store} from '@ngrx/store';
import {Subject} from 'rxjs';

import {ProfileActions} from '../../../root/actions/user-profile.actions';
import {FromProfile} from '../../../root/reducers/user-profile.reducer';

@Component({
  selector: 'arth-profile-email',
  templateUrl: 'profile-email.component.html',
  styleUrls: ['profile-email.component.css']
})
export class ProfileEmailComponent extends FormComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();

  profile: UserProfile;

  constructor(private fb: FormBuilder,
              private store: Store<UserProfile>) {
    super();
  }

  private static areEqual(group: FormGroup) {
    const allValues: string[] = [];

    for (const control in group.controls) {
      if (group.controls.hasOwnProperty(control)) {
        const val = group.controls[control].value;
        allValues.push(val);
      }
    }

    // Check all values are the same
    const valid: boolean = allValues.every(function (value, idx, arr) {
      return idx === 0 || value === arr[idx - 1];
    });

    if (valid) {
      return null;
    }

    return {
      areEqual: true
    };
  }

  ngOnInit() {

    this.store.select(FromProfile.selectLocalState).pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(profile => {
        this.profile = profile;
      });

    const emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    this.form = this.fb.group({
      emails: this.fb.group({
        email: this.fb.control('', [Validators.required, Validators.pattern(emailRegex), Validators.maxLength(100)]),
        emailConfirm: this.fb.control('', [Validators.required, Validators.pattern(emailRegex), Validators.maxLength(100)]),
      }, {validator: ProfileEmailComponent.areEqual})

    });

    this._fillFormWithData();

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  save(): void {
    this.submitAttempt = true;
    if (this.form.valid) {
      const userMetadata: UserMetaData = {email: this.form.get('emails').get('email').value};
      this.store.dispatch(new ProfileActions.UpdateMetadata(this.profile.user_id, userMetadata));
      this.onUpdateMetaData.emit();
    }
  }

  cancelEdit(): void {
    this._fillFormWithData();
    this.onCancelEdit.emit('email');
  }

  private _fillFormWithData(): void {
    if (this.profile.user_metadata.email) {
      this.form.get('emails').get('email').setValue(this.profile.user_metadata.email);
      this.form.get('emails').get('emailConfirm').setValue('');
    }
  }

}
