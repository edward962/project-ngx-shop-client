import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ngx-shop-rating',
  templateUrl: './rating.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RatingComponent,
      multi: true,
    },
  ],
})
export class RatingComponent implements ControlValueAccessor {
  public stars = [1, 2, 3, 4, 5];
  public currentRating = 0;
  public coloredStar = '';
  // tslint:disable-next-line: ban-types
  public onChange!: Function;
  public highlightRaiting: number | null = null;

  public writeValue(rating: number): void {
    this.currentRating = rating;
  }

  // tslint:disable-next-line: ban-types
  public registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  public registerOnTouched(): void {
  }

  public starSelect(index: number) {
    this.currentRating = index;
    this.onChange(this.currentRating);
  }

  public starMouseEnter(index: number) {
    this.highlightRaiting = index;
  }

  public starMouseLeave() {
    this.highlightRaiting = null;
  }

  public highlight(index: number) {
    if (!this.highlightRaiting || this.highlightRaiting < this.currentRating) {
      return index < this.currentRating;
    }
    return index < this.highlightRaiting;
  }
}
