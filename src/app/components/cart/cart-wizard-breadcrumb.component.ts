import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import {CartService} from "../../service/cart.service";
import Cart from "../../model/cart.class";
import {Auth0Service} from "../../service/auth.service";
@Component({
  selector: 'arth-cart-wizard-breadcrumb',
  templateUrl: 'cart-wizard-breadcrumb.component.html',
  styleUrls: ['cart-wizard-breadcrumb.component.css']
})
export class CartWizardBreadcrumbComponent implements OnInit {

  @Output() moveStep: EventEmitter<number> = new EventEmitter();
  cart: Cart;
  @Input() step: number;

  constructor(private cartService: CartService, public authService: Auth0Service) {}

  ngOnInit() {
    this.cart = this.cartService.cart;
  }

  hasArticles(): boolean {
    return this.cart.totalCount > 0;
  }

  isAuthenticated(): boolean {
    return this.authService.authenticated();
  }

  signinAndGoToNext($event): void {
    let comp = this;
    let goToNextStep = function() {
      comp.goToStep(3, $event);
    }
    this.authService.login($event, goToNextStep);
  }

  isOnStep(step: number): boolean {
    return this.step === step;
  }

  isAtLeast(step: number): boolean {
    return this.step >= step;
  }

  lowerThanStep(step: number): boolean {
    return this.step < step;
  }

  /**
   * User address
   */
  goToStep(step: number, $event) {
    $event.preventDefault();
    this.step = step;
    this.moveStep.emit(step);
  }
}
