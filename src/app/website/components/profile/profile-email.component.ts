import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {FormComponent} from "../form.component";
import UserMetaData from "../../model/usermetadata.class";
import UserProfile from '../../model/user-profile.class';
import {Store} from '@ngrx/store';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
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

  ngOnInit() {

    this.store.select(FromProfile.selectLocalState)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(profile => {
      this.profile = profile;
    });

    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    this.form = this.fb.group({
      emails: this.fb.group({
        email: this.fb.control("", [Validators.required, Validators.pattern(emailRegex), Validators.maxLength(100)]),
        emailConfirm: this.fb.control("", [Validators.required, Validators.pattern(emailRegex), Validators.maxLength(100)]),
      }, {validator: this.areEqual})

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
      let userMetadata: UserMetaData = {email: this.form.get('emails').get('email').value};
      this.store.dispatch(new ProfileActions.UpdateMetadata(this.profile.user_id, userMetadata));
      this.onUpdateMetaData.emit();
    }
  }

  cancelEdit(): void {
    this._fillFormWithData();
    this.onCancelEdit.emit("email");
  }

  private _fillFormWithData(): void {
    if (this.profile.user_metadata.email) {
      this.form.get('emails').get('email').setValue(this.profile.user_metadata.email);
      this.form.get('emails').get('emailConfirm').setValue('');
    }
  }

  private areEqual(group: FormGroup) {
    let allValues: string[] = [];

    for (let control in group.controls) {
      let val = group.controls[control].value;
      allValues.push(val);
    }

    // Check all values are the same
    let valid: boolean = allValues.every(function(value, idx, arr) {
      return idx === 0 || value === arr[idx - 1];
    });

    if (valid) {
      return null;
    }

    return {
      areEqual: true
    };
  }

}
