import { Component, OnInit, inject } from '@angular/core';
import {FromAdminVideo} from '../../../admin/reducers/video.reducer';
import {VideoActions} from '../../../shared/actions/video.actions';
import Article from '../../../shared/model/article.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import Video from '../../../shared/model/video.class';
import {PromoProductActions} from '../../actions/promo-product.actions';
import {FromPromoProduct} from '../../reducers/promo-product.reducer';
import { SliderComponent } from '../shared/slider/slider.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ArticleBoxComponent } from '../shared/article-box/article-box.component';
import { I18nPipe } from '../../../shared/i18n/i18n.pipe';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    imports: [SliderComponent, RouterLink, ArticleBoxComponent, AsyncPipe, I18nPipe]
})
export class HomeComponent implements OnInit {
  private promoStore = inject<Store<FromPromoProduct.State>>(Store);
  private videoStore = inject<Store<FromAdminVideo.State>>(Store);


  promoArticles$: Observable<Article[]>;
  videos$: Observable<Video[]>;

  ngOnInit() {
    this.promoArticles$ = this.promoStore.select(FromPromoProduct.selectAll);
    this.promoStore.dispatch(PromoProductActions.GetAll());
    this.videos$ = this.videoStore.select(FromAdminVideo.selectAll);
    this.videoStore.dispatch(VideoActions.GetAll());
  }

}
