import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import Article from "../../../shared/model/article.class";
import Category from "../../../shared/model/category.class";
import {ArticleRestService} from "../../../shared/service/rest/article.rest.service";
import {CategoryRestService} from "../../../shared/service/rest/category.rest.service";
import {JQueryService} from "../../service/jQuery.service";
import CartData from '../../model/cart-data.class';
import {Store} from '@ngrx/store';
import {AddArticle} from '../../actions/cart-data.actions';
import ProductData from '../../model/product-data.class';
import {LoadOne} from '../../actions/product.actions';
import * as fromProduct from '../../reducers/product.reducer';
import ProductItemData from '../../model/product-item-data.class';
import {PictureService} from '../../../shared/service/picture.service';

declare var $: any;

@Component({
  selector: 'arth-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  selected: ProductItemData;
  needZoom: boolean = false;

  constructor(public picUtil: PictureService,
              private route:ActivatedRoute,
              private store: Store<ProductData>,
              private cartDataStore: Store<CartData>,
              private jQueryService: JQueryService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      $('html,body').animate({ scrollTop: 0 }, 0);
      let articleId = params['articleId'];

      this.store.dispatch(new LoadOne(articleId));
      this.store.select(fromProduct.selectSelectedState).subscribe(selected => {
        this.selected = selected;
        setTimeout(() => {
          this.jQueryService.enableFancybox($);
        }, 10);
      });
    });
  }

  addToCart(article: Article) {
    let component = this;
    let callback = function() {
      component.cartDataStore.dispatch(new AddArticle(article));
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
