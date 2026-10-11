import { Directive, output } from '@angular/core';
import {FormGroup} from '@angular/forms';
import UserMetaData from '../model/usermetadata.class';

@Directive()
export abstract class FormComponent {
  readonly onUpdateMetaData = output<UserMetaData>();
  readonly onCancelEdit = output<string>();
  submitAttempt: boolean = false;
  form: FormGroup;

  abstract save();

  abstract cancelEdit();
}
