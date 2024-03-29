
import {takeUntil} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import UserProfile from '../../model/user-profile.class';
import UserAddress from '../../model/user-address';
import {MailService} from '../../service/mail.service';
import Mail from '../../model/mail.class';
import {Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {ProfileActions} from '../../../root/actions/user-profile.actions';
import {FromProfile} from '../../../root/reducers/user-profile.reducer';

@Component({
  selector: 'arth-profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();

  profileUpdated: boolean = false;
  editMode: boolean = false;
  editedItem: string | undefined;
  deliveryAddress: UserAddress;
  email: string;
  pendingRemoval: boolean;
  phone: string;
  incompleteProfile: boolean = true;
  userProfile$: Observable<UserProfile>;
  userId: string;

  constructor(private store: Store<UserProfile>,
              private mailService: MailService) {
  }

  ngOnInit() {
    this.userProfile$ = this.store.select(FromProfile.selectLocalState);
    this.userProfile$.pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(userProfile => {
        this._updateLocalData(userProfile);
        if (this.incompleteProfile) {
          this.editContactInfo();
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  editContactInfo(): void {
    this.editMode = true;
    this.editedItem = 'contactinfo';
  }

  editEmail(): void {
    this.editMode = true;
    this.editedItem = 'email';
  }

  cancelEdit(): void {
    this.editedItem = undefined;
    this.editMode = false;
  }

  updateMetaData(): void {
    this.profileUpdated = true;
    this.incompleteProfile = false;
    this.cancelEdit();
  }

  askForRemoval(): void {
    this.store.dispatch(ProfileActions.UpdateMetadata({userId: this.userId, metadata: {pendingRemoval: true}}));
    this.updateMetaData();
    this.mailService.sendMail(new Mail('ACCOUNT_DELETION')).subscribe(() => {
      console.log('Mail sent !');
    });
  }

  cancelAskForRemoval(): void {
    this.store.dispatch(ProfileActions.UpdateMetadata({userId: this.userId, metadata: {pendingRemoval: false}}));
    this.updateMetaData();
    this.mailService.sendMail(new Mail('ACCOUNT_DELETION_CANCEL')).subscribe(() => {
      console.log('Mail sent !');
    });
  }

  private _updateLocalData(userProfile: UserProfile): void {
    if (userProfile) {
      this.userId = userProfile.user_id;
      if (userProfile.user_metadata) {
        this.email = userProfile.user_metadata.email;
        this.pendingRemoval = userProfile.user_metadata.pendingRemoval ? userProfile.user_metadata.pendingRemoval : false;
        this.incompleteProfile = userProfile.user_metadata.profileComplete ? !userProfile.user_metadata.profileComplete : true;
        if (userProfile.user_metadata.addresses) {
          this.deliveryAddress = userProfile.user_metadata.addresses.delivery;
        }
        if (userProfile.user_metadata.phone) {
          this.phone = userProfile.user_metadata.phone;
        }
      }
    }
  }


}
