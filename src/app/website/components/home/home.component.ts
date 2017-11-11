import {Component, OnInit} from '@angular/core';
import Article from '../../../shared/model/article.class';
import * as fromProduct from '../../reducers/promo-product.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {GetAll} from '../../actions/promo-product.actions';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  promoArticles$: Observable<Article[]>;

  constructor(private store: Store<fromProduct.State>) {}

  ngOnInit() {
    this.promoArticles$ = this.store.select(fromProduct.selectAll);
    this.store.dispatch(new GetAll());
  }

}
