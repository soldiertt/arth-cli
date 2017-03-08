import {Pipe} from '@angular/core';
import Article from "../model/article.class";

@Pipe({name: 'orderBy'})
export class SortPipe {

  transform(array: Array<Article>, args: string): Array<Object> {

    console.log("calling pipe");

    if (array == null) {
      return null;
    }

    if (args == 'price') {
      array.sort((a: Article, b: Article) => {
        if (parseFloat(<any>a.price) < parseFloat(<any>b.price)) {
          return -1;
        } else if (parseFloat(<any>a.price) > parseFloat(<any>b.price)) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      array.sort((a: Article, b: Article) => {
        if (a[args].toLowerCase() < b[args].toLowerCase()) {
          return -1;
        } else if (a[args].toLowerCase() > b[args].toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    return array;
  }
}
