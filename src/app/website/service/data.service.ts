import {Injectable} from '@angular/core';
import AppData from '../model/app-data';
import {Actions} from '../model/actions.class';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import Article from '../../shared/model/article.class';
import {CategoryRestService} from '../../shared/service/rest/category.rest.service';
import {ArticleRestService} from '../../shared/service/rest/article.rest.service';
import {SliderRestService} from '../../shared/service/rest/slider.rest.service';
import Order from '../../shared/model/order.class';
import Cart from '../model/cart.class';

@Injectable()
export class DataService {

  private _appData: AppData;
  appData: BehaviorSubject<AppData>;

  constructor(private categoryRestService: CategoryRestService,
              private articleRestService: ArticleRestService,
              private sliderRestService: SliderRestService) {
    this._appData = new AppData();
    this.appData = new BehaviorSubject(this._appData);

    this.categoryRestService.listAllRoots().subscribe(categories => {
      this._appData.rootCategories = categories;
      this.appData.next(this._appData);
    });
    this.articleRestService.listAllPromo().subscribe(articles => {
      this._appData.promoArticles = articles;
      this.appData.next(this._appData);
    });
    this.sliderRestService.listAll().subscribe(slides => {
      this._appData.slides = slides;
      this.appData.next(this._appData);
    });
    this.articleRestService.listAllSlider().subscribe(articles => {
      this._appData.sliderArticles = articles;
      this.appData.next(this._appData);
    });
  }

  doAction(action: Actions, value?: any): void {
    this._appData = this.reducer(action, value);
    this.appData.next(this._appData);
  }

  private reducer(action: Actions, value?: any): AppData {
    const newState = Object.assign({}, this._appData );

    switch (action) {
      case Actions.ADDRESS_COMPLETED: {
        newState.cartWizard.addressCompleted = true;
        return newState;
      }
      case Actions.ADDRESS_INCOMPLETE: {
        newState.cartWizard.addressCompleted = false;
        return newState;
      }
      case Actions.CART_MOVE_TO_STEP: {
        const step = <number>value;
        newState.cartWizard.currentStep = step;
        if (step === 4) {
          this._computeShipping(newState);
        } else {
          newState.cart.shipping = 0;
          this._updateCart(newState.cart);
        }
        return newState;
      }
      case Actions.INIT_CART: {
        newState.cart = value;
        return newState;
      }
      case Actions.ADD_ARTICLE: {
        const newArticle = <Article>value;
        let existing: boolean = false;
        newState.cart.orders.forEach(function(order) {
          if (order.article.id === newArticle.id) {
            order.count++;
            existing = true;
          }
        });
        if (!existing) {
          newState.cart.orders.push(new Order(newArticle));
        }
        this._updateCart(newState.cart);
        return newState;
      }
      case Actions.REMOVE_ARTICLE: {
        const articleId: string = value;
        let orderIndex = newState.cart.orders.map(order => order.article.id).indexOf(articleId);
        if (orderIndex !== -1) {
          newState.cart.orders[orderIndex].count--;
        }
        this._updateCart(newState.cart);
        return newState;
      }
      case Actions.REMOVE_ORDER: {
        const articleId: string = value;
        let orderIndex = newState.cart.orders.map(order => order.article.id).indexOf(articleId);
        if (orderIndex != -1) {
          newState.cart.orders.splice(orderIndex, 1);
          if (!newState.cart.orders.length) {
            newState.cart.shipping = 0;
            newState.cartWizard.currentStep = 0;
          }
          this._updateCart(newState.cart);
        }
        return newState;
      }
      case Actions.EMPTY_CART: {
        newState.cart.orders = [];
        newState.cart.shipping = 0;
        this._updateCart(newState.cart);
        return newState;
      }
      case Actions.SET_PROFILE: {
        newState.profile = value;
        return newState;
      }
    }
    return this._appData;
  }

  private _updateCart(cart: Cart) {
    cart.totalAmount = 0;
    cart.subtotalAmount = 0;
    cart.totalPromoAmount = 0;
    cart.promoPercentage = 0;
    cart.promoAmount = 0;
    cart.totalCount = 0;
    cart.orders.forEach(order => {
      cart.totalCount += order.count;
      cart.subtotalAmount += (order.count * order.article.price);
      if (!order.article.promo) {
        cart.totalPromoAmount += (order.count * order.article.price);
      }
    });

    // Compute promotion
    if (cart.totalPromoAmount >= 2000) {
      cart.promoPercentage = 0.4;
    } else if (cart.totalPromoAmount >= 800) {
      cart.promoPercentage = 0.2;
    } else if (cart.totalPromoAmount >= 400) {
      cart.promoPercentage = 0.1;
    }
    cart.promoAmount = cart.totalPromoAmount * cart.promoPercentage;

    // Compute total
    cart.totalAmount = cart.subtotalAmount - cart.promoAmount + cart.shipping;

  }

  private _computeShipping(newState: AppData) {
    if (newState.profile) {
      let country = newState.profile.user_metadata.addresses.delivery.country;
      if (country) {
        if (country === 'BE') {
          newState.cart.shipping = 9;
        } else {
          newState.cart.shipping = 15;
        }
      } else {
        newState.cart.shipping = 0;
      }
    }
    this._updateCart(newState.cart);
  }
}
