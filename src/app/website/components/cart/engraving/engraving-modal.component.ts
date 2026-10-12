import {Component, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import Order from '../../../../shared/model/order.class';
import {FormsModule, NgForm} from '@angular/forms';
import {CartDataActions} from '../../../actions/cart-data.actions';
import {CurrencyPipe} from '@angular/common';
import {I18nPipe} from '../../../../shared/i18n/i18n.pipe';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'arth-engraving-modal',
    templateUrl: './engraving-modal.component.html',
    imports: [FormsModule, CurrencyPipe, I18nPipe, MatDialogModule]
})
export class EngravingModalComponent {
  private store = inject<Store<Order>>(Store);
  private dialogRef = inject<MatDialogRef<EngravingModalComponent>>(MatDialogRef);

  order: Order = inject<Order>(MAT_DIALOG_DATA);
  engravingName: string;

  save(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(CartDataActions.EnableOrderEngraving({articleId: this.order.article.id, engravingName: this.engravingName}));
      this.dialogRef.close(this.engravingName);
    }
  }
}
