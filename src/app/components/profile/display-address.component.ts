import {Component, Input, EventEmitter, Output} from "@angular/core";
import UserAddress from "../../model/user-address";
@Component({
  selector: 'arth-display-address',
  templateUrl: './display-address.component.html'
})
export class DisplayAddressComponent {

  @Input() address: UserAddress;
  @Output() edit: EventEmitter<string> = new EventEmitter();

  editAddress(): void {
    this.edit.emit('address');
  }

}
