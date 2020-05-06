import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-ngx-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.sass'],
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

  writeValue(): void {}
  // tslint:disable-next-line: ban-types
  registerOnChange(fn: Function) {
    this.onChange = fn;
  }
  registerOnTouched(): void {}
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
