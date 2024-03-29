import {Pipe, PipeTransform} from '@angular/core';
import {I18nService} from '../../shared/service/i18n.service';
import Category from '../../shared/model/category.class';

@Pipe({name: 'catTitle', pure: false})
export class CategoryTitlePipe implements PipeTransform {

  constructor(private i18nService: I18nService) {}

  transform(value: Category): any {
    if (!value) { return value; }
    if (this.i18nService.isFr() || this.i18nService.isEn()) {
      return value.titleFr;
    } else {
      return value.titleNl;
    }
  }
}
