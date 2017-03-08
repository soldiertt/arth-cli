import {Component, OnInit, Input} from "@angular/core";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {FormComponent} from "../form.component";
import UserMetaData from "../../model/usermetadata.class";

@Component({
  selector: 'arth-profile-email',
  templateUrl: 'profile-email.component.html',
  styleUrls: ['profile-email.component.css']
})
export class ProfileEmailComponent extends FormComponent implements OnInit {

  @Input() email: string;

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    this.form = this.fb.group({
      emails: this.fb.group({
        email: this.fb.control("", [Validators.required, Validators.pattern(emailRegex), Validators.maxLength(100)]),
        emailConfirm: this.fb.control("", [Validators.required, Validators.pattern(emailRegex), Validators.maxLength(100)]),
      }, {validator: this.areEqual})

    });

    this._fillFormWithData();

  }

  save(): void {
    this.submitAttempt = true;
    if (this.form.valid) {
      let userMetaData: UserMetaData = {email: this.form.get('emails').get('email').value};
      this.onUpdateMetaData.emit(userMetaData);
    }
  }

  cancelEdit(): void {
    this._fillFormWithData();
    this.onCancelEdit.emit("email");
  }

  private _fillFormWithData(): void {
    if (this.email) {
      this.form.get('emails').get('email').setValue(this.email);
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
