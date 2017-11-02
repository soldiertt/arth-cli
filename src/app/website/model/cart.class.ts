import Order from '../../shared/model/order.class';

export default class Cart {
  totalAmount: number;
  subtotalAmount: number;
  totalPromoAmount: number;
  promoPercentage: number;
  promoAmount: number;
  totalCount: number;
  orders: Order[];
  shipping: number;

  constructor() {
    this.totalAmount = 0;
    this.subtotalAmount = 0;
    this.totalPromoAmount = 0;
    this.promoPercentage = 0;
    this.promoAmount = 0;
    this.totalCount = 0;
    this.orders = [];
    this.shipping = 0;
  }
}
