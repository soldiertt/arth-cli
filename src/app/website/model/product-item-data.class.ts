import Article from '../../shared/model/article.class';
import Category from '../../shared/model/category.class';

export default class ProductItemData {
  product: Article;
  category: Category;
  parentCategory?: Category;
}
