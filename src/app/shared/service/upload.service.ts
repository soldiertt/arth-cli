import {Injectable} from '@angular/core';

@Injectable()
export class UploadService {

  private dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2);
  }

  private generateId(len: number) {
    const arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, this.dec2hex).join('')
  }

  generateFilename(len: number, originalFilename: string) {
    const extension = originalFilename.split('.')[1];
    return this.generateId(15) + '.' + extension;
  }
}
