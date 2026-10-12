import {Component, OnInit, inject, ChangeDetectionStrategy} from '@angular/core';
import Slide from '../../../../shared/model/slider.class';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import Article from '../../../../shared/model/article.class';
import {SlideActions} from '../../../../shared/actions/slide.actions';
import {SlideProductActions} from '../../../../shared/actions/slide-product.actions';
import {FromAdminSlide} from '../../../reducers/slide.reducer';
import {FromAdminSlideProduct} from '../../../reducers/slide-product.reducer';
import {AsyncPipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {EditSlideComponent} from '../edit/edit-slide.component';

@Component({
    templateUrl: './slide.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [AsyncPipe]
})
export class SlideComponent implements OnInit {
  private slideStore = inject<Store<FromAdminSlide.State>>(Store);
  private slideProductStore = inject<Store<FromAdminSlideProduct.State>>(Store);
  private dialog = inject(MatDialog);


  slides$: Observable<Slide[]>;
  slideProducts$: Observable<Article[]>;
  slideProductsCount$: Observable<number>;

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.slides$ = this.slideStore.select(FromAdminSlide.selectAll);
    this.slideProducts$ = this.slideProductStore.select(FromAdminSlideProduct.selectAll);
    this.slideStore.dispatch(SlideActions.GetAll());
    this.slideProductStore.dispatch(SlideProductActions.GetAll());
    this.slideProductsCount$ = this.slideProductStore.select(FromAdminSlideProduct.selectTotal);
  }

  newItem() {
    this.dialog.open(EditSlideComponent, {data: new Slide(), width: '800px'});
  }

  editItem($event, item: Slide) {
    $event.preventDefault();
    this.dialog.open(EditSlideComponent, {data: Object.assign({}, item), width: '800px'});
  }

  remove($event, id: string) {
    $event.preventDefault();
    this.slideStore.dispatch(SlideActions.Delete({id}));
  }

  removeSlideProduct($event, id: string | undefined) {
    $event.preventDefault();
    if (id) {
      this.slideProductStore.dispatch(SlideProductActions.Delete({id}));
    }
  }
}
