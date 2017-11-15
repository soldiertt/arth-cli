import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CountryRestService} from '../../../shared/service/rest/country.rest.service';
import Country from '../../../shared/model/country.class';
import {FormComponent} from '../form.component';
import UserMetaData from '../../model/usermetadata.class';
import UserAddresses from '../../model/user-addresses.class';
import UserProfile from '../../model/user-profile.class';
import {Store} from '@ngrx/store';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import {ProfileActions} from '../../../root/actions/user-profile.actions';
import {FromProfile} from '../../../root/reducers/user-profile.reducer';

@Component({
  selector: 'arth-profile-edit',
  templateUrl: 'profile-edit.component.html',
  styleUrls: ['profile-edit.component.css']
})
export class ProfileEditComponent extends FormComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();

  userProfile: UserProfile;
  countries: Country[];

  constructor(private fb: FormBuilder,
              private store: Store<UserProfile>,
              private countryRestService: CountryRestService) {
    super();

    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      phone: this.fb.control('', [Validators.required, Validators.minLength(9), Validators.maxLength(100)]),
      street: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      houseNumber: this.fb.control('', [Validators.required, Validators.maxLength(10)]),
      postbox: this.fb.control('', [Validators.maxLength(10)]),
      postcode: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      city: this.fb.control('', [Validators.required, Validators.maxLength(100)]),
      country: this.fb.control('', Validators.required)
    });
  }

  ngOnInit() {
    // Load countries
    this.countryRestService.listAll()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(countries => {
        this.countries = countries;
      });
    this.store.select(FromProfile.selectLocalState)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(profile => {
        this.userProfile = profile;
        this._fillFormWithData();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  save(): void {
    this.submitAttempt = true;
    if (this.form.valid) {
      const deliveryAddress: UserAddresses = {
        delivery:
          {
            street: this.form.get('street').value,
            houseNumber: this.form.get('houseNumber').value,
            postbox: this.form.get('postbox').value,
            postcode: this.form.get('postcode').value,
            city: this.form.get('city').value,
            country: this.form.get('country').value
          }
      };
      const userMetadata: UserMetaData = {
        addresses: deliveryAddress,
        name: this.form.get('name').value,
        phone: this.form.get('phone').value,
        profileComplete: true
      };
      this.store.dispatch(new ProfileActions.UpdateMetadata(this.userProfile.user_id, userMetadata));
      this.onUpdateMetaData.emit();
    }
  }

  cancelEdit() {
    this._fillFormWithData();
    this.onCancelEdit.emit('address');
  }

  private _fillFormWithData() {
    if (this.userProfile && this.userProfile.user_metadata) {
      const metadata = this.userProfile.user_metadata;

      this.form.get('name').setValue(metadata.name);
      this.form.get('phone').setValue(metadata.phone);

      if (metadata.addresses && metadata.addresses.delivery) {
        const address = metadata.addresses.delivery;
        this.form.get('street').setValue(address.street);
        this.form.get('houseNumber').setValue(address.houseNumber);
        this.form.get('postbox').setValue(address.postbox);
        this.form.get('postcode').setValue(address.postcode);
        this.form.get('city').setValue(address.city);
        this.form.get('country').setValue(address.country);
      }
    }

  }

}
