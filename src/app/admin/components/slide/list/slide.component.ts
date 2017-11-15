import {Component, OnInit} from '@angular/core';
import Slide from '../../../../shared/model/slider.class';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import Article from '../../../../shared/model/article.class';
import {SlideActions} from '../../../../shared/actions/slide.actions';
import {SlideProductActions} from '../../../../shared/actions/slide-product.actions';
import {FromAdminSlide} from '../../../reducers/slide.reducer';
import {FromAdminSlideProduct} from '../../../reducers/slide-product.reducer';

@Component({
  templateUrl: './slide.component.html'
})
export class SlideComponent implements OnInit {

  slides$: Observable<Slide[]>;
  slideProducts$: Observable<Article[]>;
  slideProductsCount$: Observable<number>;
  edited: Slide;

  constructor(private slideStore: Store<FromAdminSlide.State>,
              private slideProductStore: Store<FromAdminSlideProduct.State>) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.slides$ = this.slideStore.select(FromAdminSlide.selectAll);
    this.slideProducts$ = this.slideProductStore.select(FromAdminSlideProduct.selectAll);
    this.slideStore.dispatch(new SlideActions.GetAll());
    this.slideProductStore.dispatch(new SlideProductActions.GetAll());
    this.slideProductsCount$ = this.slideProductStore.select(FromAdminSlideProduct.selectTotal);
  }

  newItem() {
    this.edited = new Slide();
  }

  editItem(item: Slide) {
    this.edited = Object.assign({}, item);
  }

  remove($event, id: string) {
    $event.preventDefault();
    this.slideStore.dispatch(new SlideActions.Delete(id));
  }

  removeSlideProduct($event, id: string) {
    $event.preventDefault();
    this.slideProductStore.dispatch(new SlideProductActions.Delete(id));
  }
}
