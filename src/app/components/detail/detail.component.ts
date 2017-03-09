import {Component, OnInit, AfterViewInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import Article from "../../model/article.class";
import Category from "../../model/category.class";
import {ArticleRestService} from "../../service/article.rest.service";
import {CategoryRestService} from "../../service/category.rest.service";
import {CartService} from "../../service/cart.service";
import {JQueryService} from "../../service/jQuery.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

declare var $:any;

@Component({
  selector: 'arth-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  article: Article;
  category: Category;
  parentCategory: Category;
  needZoom: boolean = false;

  constructor(private route:ActivatedRoute,
              private articleRestService: ArticleRestService,
              private categoryRestService: CategoryRestService,
              private cartService: CartService,
              private jQueryService: JQueryService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      $('html,body').animate({ scrollTop: 0 }, 0);
      let articleId = params['articleId'];
      this.articleRestService.findById(articleId).subscribe(article => {
        this.article = article;
        this.categoryRestService.findCategory(article.type).subscribe(category => {
          this.category = category;
          if (category.parent) {
            this.categoryRestService.findCategory(category.parent).subscribe(parentCategory => {
              this.parentCategory = parentCategory;
            });
          } else {
            this.parentCategory = undefined;
          }
          this.jQueryService.enableFancybox($);
        });
      });
    });
  }

  largePicture(): string {
    if (this.article) {
      return 'assets/photos/' + this.article.type + '/' + this.article.picture;
    }
  }

  addToCart(article: Article) {
    let component = this;
    let callback = function() {
      component.cartService.addArticle(article);
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
