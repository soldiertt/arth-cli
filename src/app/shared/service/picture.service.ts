import {Injectable} from '@angular/core';
import AdvancedArticle from '../model/advanced-article.class';

@Injectable()
export class PictureService {

  miniPictureFullPath(product): string {
    return 'assets/photos/' + product.type + '/' + this.thumb(product.picture);
  }

  allMiniPicturesFullPath(product: AdvancedArticle): string[] {
    if (product.pictures) {
      return product.pictures.map(pic => 'assets/photos/' + product.type + '/' + this.thumb(pic));
    }
    return [];
  }

  largePictureFullPath(product): string {
    return 'assets/photos/' + product.type + '/' + product.picture;
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
