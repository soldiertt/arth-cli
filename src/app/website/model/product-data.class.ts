import ProductItemData from './product-item-data.class';
import Article from '../../shared/model/article.class';
import Category from '../../shared/model/category.class';

export default class ProductData {
  selected: ProductItemData;
  currentTopSales: Article[];
  currentProducts: Article[];
  subCategories: Category[];
}
