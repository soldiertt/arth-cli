import {Component, OnInit, computed, inject, input, ChangeDetectionStrategy} from '@angular/core';
import {IAlbum, Lightbox, LightboxConfig} from '@pierresh/ngx-lightbox';
import AdvancedArticle from '../../../../shared/model/advanced-article.class';
import {OrderArticle} from '../../../../shared/model/order-article';
import {JQueryService} from '../../../service/jQuery.service';
import CartData from '../../../model/cart-data.class';
import {Store} from '@ngrx/store';
import {PictureService} from '../../../../shared/service/picture.service';
import {CartDataActions} from '../../../actions/cart-data.actions';
import {CurrencyPipe} from '@angular/common';
import {I18nPipe} from '../../../../shared/i18n/i18n.pipe';

declare const $: any;

@Component({
    selector: 'arth-advanced-article-box',
    templateUrl: 'advanced-article-box.component.html',
    styleUrls: ['advanced-article-box.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CurrencyPipe, I18nPipe]
})
export class AdvancedArticleBoxComponent implements OnInit {
  private picUtil = inject(PictureService);
  private store = inject<Store<CartData>>(Store);
  private jQueryService = inject(JQueryService);
  private _lightbox = inject(Lightbox);
  private _lightboxConfig = inject(LightboxConfig);


  readonly article = input.required<AdvancedArticle>();
  readonly isOdd = input(false);
  readonly _album = computed<IAlbum[]>(() => {
    const article = this.article();
    if (!article) {
      return [];
    }
    return this.picUtil.allLargePicturesFullPath(article).map(pic => ({src: pic, thumb: this.picUtil.thumb(pic), downloadUrl: pic}));
  });

  constructor() {
    const _lightboxConfig = this._lightboxConfig;

    _lightboxConfig.alwaysShowNavOnTouchDevices = true;
    _lightboxConfig.centerVertically = true;
    _lightboxConfig.wrapAround = true;
    _lightboxConfig.showImageNumberLabel = true;
  }

  ngOnInit() {
    setTimeout(() => {
      this.jQueryService.enableFancybox($);
    }, 10);
  }

  addToCart(article: AdvancedArticle) {
    const component = this;
    const callback = () => {
      const orderArticle: OrderArticle = {...article, promo: false, noLink: true};
      component.store.dispatch(CartDataActions.AddArticle({article: orderArticle}));
    };
    this.jQueryService.addToCart($, callback);
  }

  open(index: number): void {
    this._lightbox.open(this._album(), index);
  }

}
