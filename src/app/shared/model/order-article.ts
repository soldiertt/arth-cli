export interface OrderArticle {
  id?: string;
  name: string;
  description?: string;
  type: string;
  pictures: string[];
  promo: boolean;
  price: number;
  noLink?: boolean;
}
