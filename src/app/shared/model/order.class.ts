import Article from './article.class';

export default class Order {
  article: Article;
  count: number;

  constructor(article : Article) {
    this.article = article;
    this.count = 1;
  }
}
