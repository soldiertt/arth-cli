import { Component, OnInit, inject } from '@angular/core';
import Slide from '../../../../shared/model/slider.class';
import { Router, RouterLink } from '@angular/router';
import Article from '../../../../shared/model/article.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {SlideActions} from '../../../../shared/actions/slide.actions';
import {SlideProductActions} from '../../../../shared/actions/slide-product.actions';
import {PictureService} from '../../../../shared/service/picture.service';
import {FromSlide} from '../../../reducers/slide.reducer';
import {FromSlideProduct} from '../../../reducers/slide-product.reducer';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { TruncatePipe } from '../../../pipe/truncate.pipe';

@Component({
    selector: 'arth-slider',
    templateUrl: 'slider.component.html',
    styleUrls: ['slider.component.css'],
    imports: [RouterLink, AsyncPipe, CurrencyPipe, TruncatePipe]
})
export class SliderComponent implements OnInit {
  private slideStore = inject<Store<FromSlide.State>>(Store);
  private slideProductStore = inject<Store<FromSlideProduct.State>>(Store);
  private router = inject(Router);
  picUtil = inject(PictureService);


  slides$: Observable<Slide[]>;
  slidesCount$: Observable<number>;

  sliderArticles$: Observable<Article[]>;

  ngOnInit() {
    this.slides$ = this.slideStore.select(FromSlide.selectAll);
    this.slidesCount$ = this.slideStore.select(FromSlide.selectTotal);

    this.sliderArticles$ = this.slideProductStore.select(FromSlideProduct.selectAll);
    this.slideStore.dispatch(SlideActions.GetAll());
    this.slideProductStore.dispatch(SlideProductActions.GetAll());
  }

  goToProductFromSlide(slide: Slide): void {
    if (slide.link) {
      this.router.navigate(['/detail', slide.link]);
    }
  }

}
