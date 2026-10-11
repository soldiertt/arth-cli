import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import Order from '../../../../shared/model/order.class';
import { NgForm, FormsModule } from '@angular/forms';
import {CartDataActions} from '../../../actions/cart-data.actions';
import { CurrencyPipe } from '@angular/common';
import { I18nPipe } from '../../../../shared/i18n/i18n.pipe';

declare const $: any;

@Component({
    selector: 'arth-engraving-modal',
    templateUrl: './engraving-modal.component.html',
    imports: [FormsModule, CurrencyPipe, I18nPipe]
})
export class EngravingModalComponent {

  @Input() order: Order;
  engravingName: string;

  constructor(private store: Store<Order>) {
  }

  save(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(CartDataActions.EnableOrderEngraving({articleId: this.order.article.id, engravingName: this.engravingName}));
      $('#engravingModal').modal('hide');
    }
  }
}
