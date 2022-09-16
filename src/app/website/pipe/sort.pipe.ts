import {Pipe, PipeTransform} from '@angular/core';
import Article from '../../shared/model/article.class';

@Pipe({name: 'orderBy'})
export class SortPipe implements PipeTransform {

  transform(array: Article[], args: string): any[] {

    if (array == null) {
      return [];
    }
    if (array.length === 0) {
      return array;
    }

    const sorted = [...array];
    if (args === 'price') {
      sorted.sort((a: Article, b: Article) => {
        if (parseFloat(<any>a.price) < parseFloat(<any>b.price)) {
          return -1;
        } else if (parseFloat(<any>a.price) > parseFloat(<any>b.price)) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (args === 'brand') {
      sorted.sort((a: Article, b: Article) => {
        if (a.brand.toLowerCase() < b.brand.toLowerCase()) {
          return -1;
        } else if (a.brand.toLowerCase() > b.brand.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      sorted.sort((a: Article, b: Article) => {
        if (a[args].toLowerCase() < b[args].toLowerCase()) {
          return -1;
        } else if (a[args].toLowerCase() > b[args].toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    return sorted;
  }
}
