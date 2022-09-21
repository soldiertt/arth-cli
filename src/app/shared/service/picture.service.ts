import {Injectable} from '@angular/core';
import AdvancedArticle from '../model/advanced-article.class';
import Article from '../model/article.class';
import {OrderArticle} from '../model/order-article';

@Injectable()
export class PictureService {

  firstMiniPictureFullPath(product: Article | OrderArticle): string {
    return 'assets/photos/' + product.type + '/' + this.thumb(product.pictures[0]);
  }

  allMiniPicturesFullPath(product: AdvancedArticle | Article): string[] {
    if (product.pictures) {
      return product.pictures.map(pic => 'assets/photos/' + product.type + '/' + this.thumb(pic));
    }
    return [];
  }

  firstLargePictureFullPath(product: Article): string {
    return 'assets/photos/' + product.type + '/' + product.pictures[0];
  }

  allLargePicturesFullPath(product: AdvancedArticle): string[] {
    if (product.pictures) {
      return product.pictures.map(pic => 'assets/photos/' + product.type + '/' + pic);
    }
    return [];
  }

  thumb(picture: string): string {
    if (picture) {
      const extension = picture.split('.').pop();
      return picture.substring(0, picture.lastIndexOf('.')) + 'm.' + extension;
    }
    return '<undefined>';
  }

  firstPicture(product: AdvancedArticle): string {
    if (product.pictures) {
      return product.pictures[0];
    }
    return '<undefined>';
  }

}
