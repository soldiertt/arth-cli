import {Pipe} from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe {

  transform(value: string, limit: number = 10, trail: string = '...') : string {
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
