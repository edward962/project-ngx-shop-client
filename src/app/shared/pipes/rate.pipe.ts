import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'rate',
})
export class RatePipe implements PipeTransform {
	public transform(value: number | undefined): number {
		let newValue = value !== undefined ? value : 0;
		if (newValue - Math.trunc(newValue) < 0.25) {
			newValue = Math.trunc(newValue);
		} else if (newValue - Math.trunc(newValue) >= 0.25 && newValue - Math.trunc(newValue) < 0.75) {
			newValue = Math.trunc(newValue) + 0.5;
		} else {
			newValue = Math.trunc(newValue) + 1;
		}
		return newValue;
	}
}
