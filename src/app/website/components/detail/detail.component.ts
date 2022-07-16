
import {takeUntil} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import Article from '../../../shared/model/article.class';
import {JQueryService} from '../../service/jQuery.service';
import CartData from '../../model/cart-data.class';
import {Store} from '@ngrx/store';
import ProductData from '../../model/product-data.class';
import ProductItemData from '../../model/product-item-data.class';
import {PictureService} from '../../../shared/service/picture.service';
import {Subject} from 'rxjs';
import {CartDataActions} from '../../actions/cart-data.actions';
import {ProductActions} from '../../actions/product.actions';
import {FromProduct} from '../../reducers/product.reducer';

declare const $: any;

@Component({
  selector: 'arth-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();

  selected: ProductItemData;
  needZoom: boolean = false;

  constructor(public picUtil: PictureService,
              private route: ActivatedRoute,
              private store: Store<ProductData>,
              private cartDataStore: Store<CartData>,
              private jQueryService: JQueryService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const articleId = params['articleId'];

      this.store.dispatch(new ProductActions.LoadOne(articleId));
      this.store.select(FromProduct.selectSelectedState).pipe(
        takeUntil(this.ngUnsubscribe))
        .subscribe(selected => {
          this.selected = selected;
          setTimeout(() => {
            this.jQueryService.enableFancybox($);
          }, 10);
        });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  addToCart(article: Article) {
    const component = this;
    const callback = function () {
      component.cartDataStore.dispatch(new CartDataActions.AddArticle(article));
    };
    this.jQueryService.addToCart($, callback);
  }

  detectImageSize($event) {
    if ($event.srcElement.clientWidth < $event.srcElement.naturalWidth ||
      $event.srcElement.clientHeight < $event.srcElement.naturalHeight) {
      this.needZoom = true;
    }
  }

}
