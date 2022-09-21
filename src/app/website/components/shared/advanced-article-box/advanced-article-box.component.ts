import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {IAlbum, Lightbox, LightboxConfig} from 'ngx-lightbox';
import AdvancedArticle from '../../../../shared/model/advanced-article.class';
import {JQueryService} from '../../../service/jQuery.service';
import CartData from '../../../model/cart-data.class';
import {Store} from '@ngrx/store';
import {PictureService} from '../../../../shared/service/picture.service';
import {CartDataActions} from '../../../actions/cart-data.actions';

declare const $: any;

@Component({
  selector: 'arth-advanced-article-box',
  templateUrl: 'advanced-article-box.component.html',
  styleUrls: ['advanced-article-box.component.css']
})
export class AdvancedArticleBoxComponent implements OnInit, OnChanges {

  @Input() article: AdvancedArticle;
  @Input() isOdd = false;
  _album: IAlbum[] = [];

  constructor(private picUtil: PictureService,
              private store: Store<CartData>,
              private jQueryService: JQueryService,
              private _lightbox: Lightbox,
              private _lightboxConfig: LightboxConfig) {
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

  ngOnChanges() {
    if (this.article) {
      this.picUtil.allLargePicturesFullPath(this.article).forEach(pic => {
        this._album.push({src: pic, thumb: this.picUtil.thumb(pic), downloadUrl: pic});
      });
    }
  }

  addToCart(article: AdvancedArticle) {
    const component = this;
    const callback = () => {
      const orderArticle = {...article, picture: this.picUtil.firstPicture(article), promo: false, noLink: true};
      component.store.dispatch(CartDataActions.AddArticle({article: orderArticle}));
    };
    this.jQueryService.addToCart($, callback);
  }

  open(index: number): void {
    this._lightbox.open(this._album, index);
  }

}
