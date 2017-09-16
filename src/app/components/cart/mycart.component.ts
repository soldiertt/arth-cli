import {Component, Input, OnChanges, OnInit} from "@angular/core";
import Cart from "../../model/cart.class";
import {CartService} from "../../service/cart.service";
import Article from "../../model/article.class";
import {Auth0Service} from "../../service/auth.service";
import {SessionService} from "../../service/session.service";
import {DataService} from '../../service/data.service';

@Component({
  selector: 'arth-mycart',
  templateUrl: 'mycart.component.html',
  styleUrls: ['mycart.component.css']
})
export class MyCartComponent implements OnInit, OnChanges {

  @Input() cart: Cart;

  constructor(private dataService: DataService,
              private cartService: CartService,
              private sessionService: SessionService,
              public authService: Auth0Service) { }

  ngOnInit() {
    this.dataService.appData.subscribe(appData => {
      if (appData.cartData.currentStep === 4 && this.sessionService.getProfile()) {
        let country = this.sessionService.getProfile().user_metadata.addresses.delivery.country;
        this.cartService.computeShipping(country);
      } else {
        this.cartService.computeShipping();
      }
    });
  }

  ngOnChanges() {

  }

  removeOrder($event, articleId: number) {
    $event.preventDefault();
    this.cartService.removeOrder(articleId);
  }

  miniPicture(article): string {
    let picture = article.picture;
    let extension = picture.split('.').pop();
    let miniPicture = picture.substring(0, picture.lastIndexOf('.')) + 'm.' + extension;
    return 'assets/photos/' + article.type + '/' + miniPicture;
  }

  addArticle($event, article: Article ) {
    $event.preventDefault();
    this.cartService.addArticle(article);
  }

  removeArticle($event, articleId: number) {
    $event.preventDefault();
    this.cartService.removeArticle(articleId);
  }

}
