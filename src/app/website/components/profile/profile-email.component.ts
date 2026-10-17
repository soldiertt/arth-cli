import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormComponent} from '../form.component';
import UserMetaData from '../../model/usermetadata.class';
import UserProfile from '../../model/user-profile.class';
import {Store} from '@ngrx/store';
import {ProfileActions} from '../../../root/actions/user-profile.actions';
import {FromProfile} from '../../../root/reducers/user-profile.reducer';
import {I18nPipe} from '../../../shared/i18n/i18n.pipe';

@Component({
    selector: 'arth-profile-email',
    templateUrl: 'profile-email.component.html',
    styleUrls: ['profile-edit.component.css', 'profile-email.component.css'],
    imports: [FormsModule, ReactiveFormsModule, I18nPipe]
})
export class ProfileEmailComponent extends FormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject<Store<UserProfile>>(Store);

  readonly profile = this.store.selectSignal(FromProfile.selectLocalState);

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
    const emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    this.form = this.fb.group({
      emails: this.fb.group({
        email: this.fb.control('', [Validators.required, Validators.pattern(emailRegex), Validators.maxLength(100)]),
        emailConfirm: this.fb.control('', [Validators.required, Validators.pattern(emailRegex), Validators.maxLength(100)]),
      }, {validator: ProfileEmailComponent.areEqual})

    });

    this._fillFormWithData();

  }

  save(): void {
    this.submitAttempt = true;
    if (this.form.valid) {
      const userMetadata: UserMetaData = {email: this.form.get('emails')?.get('email')?.value};
      this.store.dispatch(ProfileActions.UpdateMetadata({userId: this.profile().user_id, metadata: userMetadata}));
      this.onUpdateMetaData.emit(undefined);
    }
  }

  cancelEdit(): void {
    this._fillFormWithData();
    this.onCancelEdit.emit('email');
  }

  private _fillFormWithData(): void {
    if (this.profile().user_metadata.email) {
      this.form.get('emails')?.get('email')?.setValue(this.profile().user_metadata.email);
      this.form.get('emails')?.get('emailConfirm')?.setValue('');
    }
  }

}
