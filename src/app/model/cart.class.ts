import Article from "./article.class";
export class Order {
  article: Article;
  count: number;

  constructor(article : Article) {
    this.article = article;
    this.count = 1;
  }
}

export default class Cart {
  totalAmount: number;
  totalCount: number;
  orders: Order[];
  shipping: number;

  constructor() {
    this.totalAmount = 0;
    this.totalCount = 0;
    this.orders = [];
    this.shipping = 0;
  }
}
