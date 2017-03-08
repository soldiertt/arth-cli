import { Pipe, PipeTransform } from '@angular/core';
import {I18nService} from "./i18n.service";
import Category from "../model/category.class";

@Pipe({name: 'catTitle', pure: false})
export class CategoryTitlePipe implements PipeTransform {

  constructor(private i18nService : I18nService) {};

  transform(value: Category, args: string[]): any {
    if (!value) return value;
    if (this.i18nService.isFr() || this.i18nService.isEn()) {
      return value.titleFr;
    } else {
      return value.titleNl;
    }
  }
}
