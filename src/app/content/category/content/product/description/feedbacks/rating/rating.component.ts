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
  public stars: number[] = [1, 2, 3, 4, 5];
  public currentRating = 0;
  public coloredStar = '';
  public onChange!: Function;
  public highlightRaiting: number | null = null;

  public writeValue(rating: number): void {
    this.currentRating = rating;
  }

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  public registerOnTouched(): void {}

  public starSelect(index: number): void {
    this.currentRating = index;
    this.onChange(this.currentRating);
  }

  public starMouseEnter(index: number): void {
    this.highlightRaiting = index;
  }

  public starMouseLeave(): void {
    this.highlightRaiting = null;
  }

  public highlight(index: number): boolean {
    if (!this.highlightRaiting || this.highlightRaiting < this.currentRating) {
      return index < this.currentRating;
    }
    return index < this.highlightRaiting;
  }
}
