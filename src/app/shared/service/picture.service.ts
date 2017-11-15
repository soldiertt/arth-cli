import {Injectable} from '@angular/core';

@Injectable()
export class PictureService {

  miniPicture(product): string {
    const picture = product.picture;
    const extension = picture.split('.').pop();
    const miniPicture = picture.substring(0, picture.lastIndexOf('.')) + 'm.' + extension;
    return 'assets/photos/' + product.type + '/' + miniPicture;
  }

  largePicture(product): string {
    return 'assets/photos/' + product.type + '/' + product.picture;
  }
}
