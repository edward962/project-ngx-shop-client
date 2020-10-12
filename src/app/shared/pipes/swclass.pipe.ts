import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'swClass',
})
export class SwClassPipe implements PipeTransform {
  public transform(
    // tslint:disable-next-line:no-any
    value: any,
    firstClass: string,
    secondClass = ''
  ): string {
    return value ? firstClass : secondClass;
  }
}
