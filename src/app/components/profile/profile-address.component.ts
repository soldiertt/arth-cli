import {Component, OnInit, Input} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {CountryRestService} from "../../service/country.rest.service";
import Country from "../../model/country.class";
import {FormComponent} from "../form.component";
import UserMetaData from "../../model/usermetadata.class";
import UserAddress from "../../model/user-address";
import UserAddresses from "../../model/user-addresses.class";

@Component({
  selector: 'arth-profile-address',
  templateUrl: 'profile-address.component.html',
  styleUrls: ['profile-address.component.css']
})
export class ProfileAddressComponent extends FormComponent implements OnInit {

  @Input() address: UserAddress;
  @Input() phone: string;

  countries: Country[];

  constructor(private fb: FormBuilder, private countryRestService: CountryRestService) {
    super();
  }

  ngOnInit() {

    this.form = this.fb.group({
      phone: this.fb.control("", [Validators.required, Validators.maxLength(100)]),
      street: this.fb.control("", [Validators.required, Validators.maxLength(100)]),
      houseNumber: this.fb.control("", [Validators.required, Validators.maxLength(10)]),
      postbox: this.fb.control("", [Validators.maxLength(10)]),
      postcode: this.fb.control("", [Validators.required, Validators.maxLength(10)]),
      city: this.fb.control("", [Validators.required, Validators.maxLength(100)]),
      country: this.fb.control("", Validators.required)
    });

    // Fill form
    this._fillFormWithData();

    // Load countries
    this.countryRestService.listAll().subscribe(countries => {
      this.countries = countries;
    });

  }

  save(): void {
    this.submitAttempt = true;
    if (this.form.valid) {
      let deliveryAddress: UserAddresses = {delivery: {street: this.form.get("street").value,
                                                        houseNumber: this.form.get("houseNumber").value,
                                                        postbox: this.form.get("postbox").value,
                                                        postcode: this.form.get("postcode").value,
                                                        city: this.form.get("city").value,
                                                        country: this.form.get("country").value
                                                      }};
      let userMetadata: UserMetaData = {addresses: deliveryAddress, phone: this.form.get("phone").value, profileComplete: true};
      this.onUpdateMetaData.emit(userMetadata);
    }
  }

  cancelEdit() {
    this._fillFormWithData();
    this.onCancelEdit.emit("address");
  }

  private _fillFormWithData() {
    if (this.address) {
      this.form.get('phone').setValue(this.phone);
      this.form.get('street').setValue(this.address.street);
      this.form.get('houseNumber').setValue(this.address.houseNumber);
      this.form.get('postbox').setValue(this.address.postbox);
      this.form.get('postcode').setValue(this.address.postcode);
      this.form.get('city').setValue(this.address.city);
      this.form.get('country').setValue(this.address.country);
    }
  }

}
