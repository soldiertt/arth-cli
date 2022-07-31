import {Component, OnInit} from '@angular/core';
import {FromAdminVideo} from '../../../admin/reducers/video.reducer';
import {VideoActions} from '../../../shared/actions/video.actions';
import Article from '../../../shared/model/article.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import Video from '../../../shared/model/video.class';
import {PromoProductActions} from '../../actions/promo-product.actions';
import {FromPromoProduct} from '../../reducers/promo-product.reducer';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  promoArticles$: Observable<Article[]>;
  videos$: Observable<Video[]>;

  constructor(private promoStore: Store<FromPromoProduct.State>,
              private videoStore: Store<FromAdminVideo.State>) {}

  ngOnInit() {
    this.promoArticles$ = this.promoStore.select(FromPromoProduct.selectAll);
    this.promoStore.dispatch(PromoProductActions.GetAll());
    this.videos$ = this.videoStore.select(FromAdminVideo.selectAll);
    this.videoStore.dispatch(VideoActions.GetAll());
  }

}
