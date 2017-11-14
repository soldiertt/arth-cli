import {Component, OnInit} from '@angular/core';
import Article from '../../../shared/model/article.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {PromoProductActions} from '../../actions/promo-product.actions';
import {FromPromoProduct} from '../../reducers/promo-product.reducer';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  promoArticles$: Observable<Article[]>;

  constructor(private store: Store<FromPromoProduct.State>) {}

  ngOnInit() {
    this.promoArticles$ = this.store.select(FromPromoProduct.selectAll);
    this.store.dispatch(new PromoProductActions.GetAll());
  }

}
