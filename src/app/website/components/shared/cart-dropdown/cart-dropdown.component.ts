import {Component, OnInit} from "@angular/core";
import Cart from "../../../model/cart.class";
import CartData from '../../../model/cart-data.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromCartData from '../../../reducers/cart-data.reducer';
import {RemoveOrder} from '../../../actions/cart-data.actions';
import {PictureService} from '../../../../shared/service/picture.service';

@Component({
  selector: 'arth-cart-dropdown',
  templateUrl: 'cart-dropdown.component.html',
  styleUrls: ['cart-dropdown.component.css']
})
export class CartDropdownComponent implements OnInit {

  cart$: Observable<Cart>;

  constructor(public picUtil: PictureService,
              private store: Store<CartData>) { }

  ngOnInit() {
    this.cart$ = this.store.select(fromCartData.selectCartState);
  }

  removeOrder($event, articleId: string) {
    $event.stopPropagation();
    this.store.dispatch(new RemoveOrder(articleId));
  }

}
