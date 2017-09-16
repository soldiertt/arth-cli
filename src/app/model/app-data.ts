class CartData {
  addressCompleted: boolean;
  currentStep: number;
}

export default class AppData {
  cartData : CartData;

  constructor() {
    this.cartData = new CartData();
  }
}
