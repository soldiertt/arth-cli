import {Component, EventEmitter, Output, Input} from "@angular/core";
import UserProfile from '../../model/user-profile.class';
@Component({
  selector: 'arth-profile-display',
  templateUrl: 'profile-display.component.html'
})
export class ProfileDisplayComponent {

  @Input() userProfile: UserProfile;
  @Output() edit: EventEmitter<string> = new EventEmitter();

  constructor() {}

  editContactInfo(): void {
    this.edit.emit('contactinfo');
  }

}
