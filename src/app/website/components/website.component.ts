import {takeUntil} from 'rxjs/operators';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AdvancedProductActions} from '../actions/advanced-product.actions';
import CartData from '../model/cart-data.class';
import {Store} from '@ngrx/store';
import {CartDataActions} from '../actions/cart-data.actions';
import {Subject} from 'rxjs';
import {ProfileActions} from '../../root/actions/user-profile.actions';
import {FromCartData} from '../reducers/cart-data.reducer';
import {HeaderComponent} from './shared/header/header.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from './shared/footer/footer.component';

@Component({
    templateUrl: './website.component.html',
    imports: [HeaderComponent, RouterOutlet, FooterComponent]
})
export class WebsiteComponent implements OnInit, OnDestroy {
  private store = inject<Store<CartData>>(Store);

  private ngUnsubscribe: Subject<any> = new Subject();

  ngOnInit() {
    // Initialize Cart from local storage
    this.store.dispatch(CartDataActions.GetCartFromSession());

    // Save cart to local storage as soon as it is updated
    this.store.select(FromCartData.selectCartState).pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(cart => {
        this.store.dispatch(CartDataActions.SaveCartInSession({cart}));
    });

    // Initialize Profile from local storage (if any)
    this.store.dispatch(ProfileActions.InitFromSession());

    // Load advanced products
    this.store.dispatch(AdvancedProductActions.LoadAll());
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}
