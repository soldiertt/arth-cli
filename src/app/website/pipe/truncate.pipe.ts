import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string | undefined, limit: number = 10, trail: string = '...'): string | undefined {
    if (value) {
      return value.length > limit ? value.substring(0, limit) + trail : value;
    } else {
      return value;
    }
  }
}
