import {Component, OnInit} from "@angular/core";
import {CartService} from "../../service/cart.service";
import Cart from "../../model/cart.class";
@Component({
  templateUrl: 'cart-wizard.component.html'
})
export class CartWizardComponent implements OnInit {

  currentStep: number = 0;
  paymentData: any;
  cart: Cart;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cart = this.cartService.cart;
  }

  isOnStep(step: number): boolean {
    return this.currentStep === step;
  }

  stepChanged($event) {
    this.currentStep = $event;
  }

  paymentConfirmed($event) {
    this.paymentData = $event;
    this.currentStep = 5;
  }

  hasArticles(): boolean {
    return this.cart.totalCount > 0;
  }
}
