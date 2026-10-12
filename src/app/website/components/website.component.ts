import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AdvancedProductActions} from '../actions/advanced-product.actions';
import CartData from '../model/cart-data.class';
import {Store} from '@ngrx/store';
import {CartDataActions} from '../actions/cart-data.actions';
import {ProfileActions} from '../../root/actions/user-profile.actions';
import {FromCartData} from '../reducers/cart-data.reducer';
import {HeaderComponent} from './shared/header/header.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from './shared/footer/footer.component';

@Component({
    templateUrl: './website.component.html',
    imports: [HeaderComponent, RouterOutlet, FooterComponent]
})
export class WebsiteComponent implements OnInit {
  private store = inject<Store<CartData>>(Store);

  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    // Initialize Cart from local storage
    this.store.dispatch(CartDataActions.GetCartFromSession());

    // Save cart to local storage as soon as it is updated
    this.store.select(FromCartData.selectCartState).pipe(
      takeUntilDestroyed(this.destroyRef))
      .subscribe(cart => {
        this.store.dispatch(CartDataActions.SaveCartInSession({cart}));
    });

    // Initialize Profile from local storage (if any)
    this.store.dispatch(ProfileActions.InitFromSession());

    // Load advanced products
    this.store.dispatch(AdvancedProductActions.LoadAll());
  }

}
