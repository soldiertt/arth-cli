export default class Article {
  id?: string;
  type: string;
  brand: string;
  name: string;
  description?: string;
  pictures: string[];
  handle: string;
  steel: string;
  size: string;
  youtube_ref?: string;
  promo: boolean;
  instock: boolean;
  price: number;
  old_price?: number;
  comment?: string;
}
