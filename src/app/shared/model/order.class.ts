import {OrderArticle} from './order-article';

export default class Order {
  article: OrderArticle;
  count: number;

  constructor(article: OrderArticle) {
    this.article = article;
    this.count = 1;
  }
}
