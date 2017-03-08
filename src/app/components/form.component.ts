import {EventEmitter, Output} from "@angular/core";
import {FormGroup} from "@angular/forms";
import UserMetaData from "../model/usermetadata.class";
export abstract class FormComponent {
  @Output() onUpdateMetaData: EventEmitter<UserMetaData> = new EventEmitter();
  @Output() onCancelEdit: EventEmitter<string> = new EventEmitter();
  submitAttempt: boolean = false;
  form: FormGroup;

  abstract save();
  abstract cancelEdit();
}
