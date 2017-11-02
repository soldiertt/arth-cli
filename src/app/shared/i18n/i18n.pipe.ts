import { Pipe, PipeTransform } from '@angular/core';
import {I18nService} from "../service/i18n.service";

@Pipe({name: 'trans', pure: false})
export class I18nPipe implements PipeTransform {

  constructor(private i18nService : I18nService) {};

  transform(value: string, args: string[]): any {
    if (!value) return value;

    return this.i18nService.translate(value);
  }
}
