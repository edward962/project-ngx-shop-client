import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'rate',
})
export class RatePipe implements PipeTransform {
	public transform(value: number): number | undefined {
		let newValue = value;
		if (value - Math.trunc(value) < 0.25) {
			newValue = Math.trunc(value);
		} else if (value - Math.trunc(value) >= 0.25 && value - Math.trunc(value) < 0.75) {
			newValue = Math.trunc(value) + 0.5;
		} else {
			newValue = Math.trunc(value) + 1;
		}
		return newValue;
	}
}
