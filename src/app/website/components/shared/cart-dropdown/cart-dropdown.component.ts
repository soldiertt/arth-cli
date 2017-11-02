import {Component, OnInit} from "@angular/core";
import Cart from "../../../model/cart.class";
import {CartService} from "../../../service/cart.service";
import {DataService} from '../../../service/data.service';

@Component({
  selector: 'arth-cart-dropdown',
  templateUrl: 'cart-dropdown.component.html',
  styleUrls: ['cart-dropdown.component.css']
})
export class CartDropdownComponent implements OnInit {
  cart: Cart;

  constructor(private cartService: CartService, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.appData.subscribe(appData => this.cart = appData.cart);
  }

  removeOrder($event, articleId: string) {
    $event.stopPropagation();
    this.cartService.removeOrder(articleId);
  }

  miniPicture(article): string {
    let picture = article.picture;
    let extension = picture.split('.').pop();
    let miniPicture = picture.substring(0, picture.lastIndexOf('.')) + 'm.' + extension;
    return 'assets/photos/' + article.type + '/' + miniPicture;
  }

}
