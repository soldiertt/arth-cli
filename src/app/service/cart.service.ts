import {Injectable, OnInit} from "@angular/core";
import Article from "../model/article.class";
import Cart from "../model/cart.class";
import {Order} from "../model/cart.class";
import {SessionService} from "./session.service";

@Injectable()
export class CartService {
  cart: Cart;

  constructor(private sessionService: SessionService) {
    let sessionCart = this.sessionService.getCart();
    if (sessionCart) {
      this.cart = sessionCart;
    } else {
      this.cart = new Cart();
    }
  }

  addArticle(article: Article) {
    let existing: boolean = false;
    this.cart.orders.forEach(function(order) {
      if (order.article.id === article.id) {
        order.count++;
        existing = true;
      }
    });
    if (!existing) {
      this.cart.orders.push(new Order(article));
    }
    this._updateCart();
  }

  removeArticle(articleId: number) {
    let orderIndex = this.cart.orders.map(order => order.article.id).indexOf(articleId);
    if (orderIndex !== -1) {
      this.cart.orders[orderIndex].count--;
    }
    this._updateCart();
  }

  setOrderCount(articleId: number, count: number) {
    let orderIndex = this.cart.orders.map(order => order.article.id).indexOf(articleId);
    if (orderIndex != -1) {
      this.cart.orders[orderIndex].count = count;
      this._updateCart();
    }
  }

  removeOrder(articleId: number) {
    let orderIndex = this.cart.orders.map(order => order.article.id).indexOf(articleId);
    if (orderIndex != -1) {
      this.cart.orders.splice(orderIndex, 1);
      this._updateCart();
    }
  }

  emptyCart() {
    this.cart.orders = [];
    this._updateCart();
  }

  private _updateCart() {
    this.cart.totalAmount = 0;
    this.cart.totalCount = 0;
    this.cart.orders.forEach(order => {
      this.cart.totalCount += order.count;
      this.cart.totalAmount += (order.count * order.article.price);
    });
    this.sessionService.saveCart(this.cart);
  }

}
