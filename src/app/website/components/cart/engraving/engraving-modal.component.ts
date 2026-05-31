import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import Order from '../../../../shared/model/order.class';
import {NgForm} from '@angular/forms';
import {CartDataActions} from '../../../actions/cart-data.actions';

declare const $: any;

@Component({
  selector: 'arth-engraving-modal',
  templateUrl: './engraving-modal.component.html'
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
