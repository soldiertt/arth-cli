import {Injectable} from "@angular/core";
import Article from "../model/article.class";
import {SessionService} from "./session.service";
import {DataService} from './data.service';
import {Actions} from '../model/actions.class';

@Injectable()
export class CartService {

  constructor(private sessionService: SessionService, private dataService: DataService) {
    let sessionCart = this.sessionService.getCart();
    if (sessionCart) {
      this.dataService.doAction(Actions.INIT_CART, sessionCart);
    }
    this.dataService.appData.subscribe(appData => {
      this.sessionService.saveCart(appData.cart);
    });
  }

  addArticle(article: Article) {
    this.dataService.doAction(Actions.ADD_ARTICLE, article);
  }

  removeArticle(articleId: number) {
    this.dataService.doAction(Actions.REMOVE_ARTICLE, articleId);
  }

  removeOrder(articleId: number) {
    this.dataService.doAction(Actions.REMOVE_ORDER, articleId);
  }

  emptyCart() {
    this.dataService.doAction(Actions.EMPTY_CART);
  }

}
