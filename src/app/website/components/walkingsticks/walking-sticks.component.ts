import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import AdvancedArticle from '../../../shared/model/advanced-article.class';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {FromAdvancedProduct} from '../../reducers/advanced-product.reducer';

@Component({
  templateUrl: 'walking-sticks.component.html'
})
export class WalkingSticksComponent implements OnInit {

  articles$: Observable<AdvancedArticle[]>;

  constructor(private store: Store<AdvancedArticle[]>) {
  }

  ngOnInit() {
    this.articles$ = this.store.select(FromAdvancedProduct.selectLocalState).pipe(map(articles => {
      return articles.filter(article => article.type === 'sticks');
    }));
  }
}
