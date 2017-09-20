import {Component, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {CountryRestService} from "../../service/country.rest.service";
import Country from "../../model/country.class";
import {FormComponent} from "../form.component";
import UserMetaData from "../../model/usermetadata.class";
import UserAddress from "../../model/user-address";
import UserAddresses from "../../model/user-addresses.class";
import UserProfile from "../../model/user-profile.class";
import {DataService} from '../../service/data.service';

@Component({
  selector: 'arth-profile-edit',
  templateUrl: 'profile-edit.component.html',
  styleUrls: ['profile-edit.component.css']
})
export class ProfileEditComponent extends FormComponent implements OnInit {

  profile: UserProfile;
  countries: Country[];
  address: UserAddress;
  phone: string;
  name: string;

  constructor(private fb: FormBuilder, private dataService: DataService, private countryRestService: CountryRestService) {
    super();

    this.form = this.fb.group({
      name: this.fb.control("", [Validators.required, Validators.maxLength(100)]),
      phone: this.fb.control("", [Validators.required, Validators.maxLength(100)]),
      street: this.fb.control("", [Validators.required, Validators.maxLength(100)]),
      houseNumber: this.fb.control("", [Validators.required, Validators.maxLength(10)]),
      postbox: this.fb.control("", [Validators.maxLength(10)]),
      postcode: this.fb.control("", [Validators.required, Validators.maxLength(10)]),
      city: this.fb.control("", [Validators.required, Validators.maxLength(100)]),
      country: this.fb.control("", Validators.required)
    });
  }

  ngOnInit() {

    this.dataService.appData.subscribe(appData => {
      this.profile = appData.profile;
      this._updateLocalData();
      // Fill form
      this._fillFormWithData();
    });

    // Load countries
    this.countryRestService.listAll().subscribe(countries => {
      this.countries = countries;
    });

  }

  private _updateLocalData() {
    if (this.profile && this.profile.user_metadata) {
      if (this.profile.user_metadata.addresses) {
        this.address = this.profile.user_metadata.addresses.delivery;
      }
      this.name = this.profile.user_metadata.name;
      this.phone = this.profile.user_metadata.phone;
    }
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
      let userMetadata: UserMetaData = {addresses: deliveryAddress,
        name: this.form.get("name").value,
        phone: this.form.get("phone").value,
        profileComplete: true};
      this.onUpdateMetaData.emit(userMetadata);
    }
  }

  cancelEdit() {
    this._fillFormWithData();
    this.onCancelEdit.emit("address");
  }

  private _fillFormWithData() {
    this.form.get('name').setValue(this.name);
    this.form.get('phone').setValue(this.phone);

    if (this.address) {
      this.form.get('street').setValue(this.address.street);
      this.form.get('houseNumber').setValue(this.address.houseNumber);
      this.form.get('postbox').setValue(this.address.postbox);
      this.form.get('postcode').setValue(this.address.postcode);
      this.form.get('city').setValue(this.address.city);
      this.form.get('country').setValue(this.address.country);
    }
  }

}
