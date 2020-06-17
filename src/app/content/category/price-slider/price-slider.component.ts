import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
} from '@angular/forms';

export interface IPriceValue{
  low: number;
  high: number
}


@Component({
  selector: 'ngx-shop-price-slider',
  templateUrl: './price-slider.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PriceSliderComponent,
      multi: true,
    },
  ],
})
export class PriceSliderComponent implements ControlValueAccessor, OnInit {
  constructor(private readonly _fb: FormBuilder) {}

  public pricesValue?: IPriceValue ;
  public onChange!: Function;
  public value = 0;
  public highValue = 2000;
  public options: Options = {
    floor: 0,
    ceil: 2000,
  };
  public priceForm = this._fb.group({
    low: [this.value],
    high: [this.highValue],
  });
  public ngOnInit() {
    this.priceForm.valueChanges.subscribe(({ low, high }) => {
      this.value = low;
      this.highValue = high;
      this.onChange({ low: this.value, high: this.highValue });
    });
  }
  writeValue(): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  public userChangeEnd() {
    this.pricesValue = { low: this.value, high: this.highValue };
    this.onChange(this.pricesValue);
  }
}
