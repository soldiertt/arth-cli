import {Injectable} from '@angular/core';

@Injectable()
export class PictureService {

  miniPicture(product): string {
    let picture = product.picture;
    let extension = picture.split('.').pop();
    let miniPicture = picture.substring(0, picture.lastIndexOf('.')) + 'm.' + extension;
    return 'assets/photos/' + product.type + '/' + miniPicture;
  }

  largePicture(product): string {
    return 'assets/photos/' + product.type + '/' + product.picture;
  }
}
