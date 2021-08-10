import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'swClass',
})
export class SwClassPipe implements PipeTransform {
	public transform(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		value: any,
		firstClass: string,
		secondClass = '',
	): string {
		return value ? firstClass : secondClass;
	}
}
