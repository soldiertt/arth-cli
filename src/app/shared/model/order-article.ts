export interface OrderArticle {
  id?: string;
  name: string;
  description?: string;
  picture: string;
  promo: boolean;
  price: number;
  noLink?: boolean;
}
