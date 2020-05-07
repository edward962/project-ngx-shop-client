import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rate',
})
export class RatePipe implements PipeTransform {
  // tslint:disable-next-line: no-any
  public transform(value: any): number | undefined {
    if (value - Math.trunc(value) < 0.25) {
      value = Math.trunc(value);
    } else if (
      value - Math.trunc(value) >= 0.25 &&
      value - Math.trunc(value) < 0.75
    ) {
      value = Math.trunc(value) + 0.5;
    } else {
      value = Math.trunc(value) + 1;
    }
    return value;
  }
}
