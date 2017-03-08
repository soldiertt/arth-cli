import {Component, Input} from "@angular/core";
import Article from "../../../model/article.class";
import {CartService} from "../../../service/cart.service";
import {JQueryService} from "../../../service/jQuery.service";

declare var $:any;

@Component({
  selector: 'arth-article-box',
  templateUrl: 'article-box.component.html',
  styleUrls: ['article-box.component.css']
})
export class ArticleBoxComponent {

  constructor(private cartService: CartService, private jQueryService: JQueryService) {};

  @Input() article: Article;

  miniPicture(article): string {
    let picture = article.picture;
    let extension = picture.split('.').pop();
    let miniPicture = picture.substring(0, picture.lastIndexOf('.')) + 'm.' + extension;
    return 'assets/photos/' + article.type + '/' + miniPicture;
  }

  addToCart(article) {
    let component = this;
    let callback = function() {
      component.cartService.addArticle(article);
    };
    this.jQueryService.addToCart($, callback);
  }
}
