import {Component, OnInit} from '@angular/core';
import * as fromSlide from '../../../reducers/slide.reducer';
import * as fromSlideProduct from '../../../reducers/slide-product.reducer';
import * as slideActions from '../../../actions/slide.actions';
import * as slideProductActions from '../../../actions/slide-product.actions';
import Slide from '../../../../shared/model/slider.class';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import Article from '../../../../shared/model/article.class';

@Component({
  templateUrl: './slide.component.html'
})
export class SlideComponent implements OnInit {

  slides$: Observable<Slide[]>;
  slideProducts$: Observable<Article[]>;
  slideProductsCount$: Observable<number>;
  edited: Slide;

  constructor(private slideStore: Store<fromSlide.State>,
              private slideProductStore: Store<fromSlideProduct.State>) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.slides$ = this.slideStore.select(fromSlide.selectAll);
    this.slideProducts$ = this.slideProductStore.select(fromSlideProduct.selectAll);
    this.slideStore.dispatch(new slideActions.GetAll());
    this.slideProductStore.dispatch(new slideProductActions.GetAll());
    this.slideProductsCount$ = this.slideProductStore.select(fromSlideProduct.selectTotal);
  }

  newItem() {
    this.edited = new Slide();
  }

  editItem(item: Slide) {
    this.edited = Object.assign({}, item);
  }

  remove($event, id: string) {
    $event.preventDefault();
    this.slideStore.dispatch(new slideActions.Delete(id));
  }

  removeSlideProduct($event, id: string) {
    $event.preventDefault();
    this.slideProductStore.dispatch(new slideProductActions.Delete(id));
  }
}
