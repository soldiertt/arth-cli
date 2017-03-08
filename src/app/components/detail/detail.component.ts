import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import Article from "../../model/article.class";
import Category from "../../model/category.class";
import {ArticleRestService} from "../../service/article.rest.service";
import {CategoryRestService} from "../../service/category.rest.service";
import {CartService} from "../../service/cart.service";
import {JQueryService} from "../../service/jQuery.service";

declare var $:any;

@Component({
  selector: 'arth-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  openModalWindow: boolean = false;
  imagePointer: number;
  article: Article;
  category: Category;
  parentCategory: Category;
  images = [];
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
        this.images.push({thumb: "", img: this.largePicture(), description: this.article.name})
        this.categoryRestService.findCategory(article.type).subscribe(category => {
          this.category = category;
          if (category.parent) {
            this.categoryRestService.findCategory(category.parent).subscribe(parentCategory => {
              this.parentCategory = parentCategory;
            });
          } else {
            this.parentCategory = undefined;
          }
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

  openImageModal(imageSrc, images) {
    if (this.needZoom) {
      let imageModalPointer;
      for (let i = 0; i < images.length; i++) {
        if (imageSrc === images[i].img) {
          imageModalPointer = i;
          break;
        }
      }
      this.openModalWindow = true;
      this.images = images;
      this.imagePointer = imageModalPointer;
    }
  }

  cancelImageModal() {
    this.openModalWindow = false;
  }

  detectImageSize($event) {
    if ($event.srcElement.clientWidth < $event.srcElement.naturalWidth ||
      $event.srcElement.clientHeight < $event.srcElement.naturalHeight) {
      this.needZoom = true;
    }
  }
}
