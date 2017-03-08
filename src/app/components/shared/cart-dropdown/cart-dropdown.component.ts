import {Component, OnInit} from "@angular/core";
import Cart from "../../../model/cart.class";
import {CartService} from "../../../service/cart.service";

@Component({
  selector: 'arth-cart-dropdown',
  templateUrl: 'cart-dropdown.component.html',
  styleUrls: ['cart-dropdown.component.css']
})
export class CartDropdownComponent implements OnInit {
  cart: Cart;
  cartIsOpen: boolean;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cart = this.cartService.cart;
  }

  toggleCartDropdown() {
    this.cartIsOpen = !this.cartIsOpen;
  }

  hideCart() {
    console.log("mouse out");
    setTimeout(() => {
      this.cartIsOpen = false;
    }, 2000);
  }

  removeOrder($event, articleId: number) {
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
