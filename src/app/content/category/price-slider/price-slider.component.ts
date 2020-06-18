import { Component, OnInit, Input } from '@angular/core';
import { Options } from 'ng5-slider';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
} from '@angular/forms';

export interface IPriceValue {
  low: number;
  high: number;
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
  @Input()
  public pricesValue?: number[];
  public onChange!: Function;
  public lowTest = 0;
  public highTest = 2000;
  public options: Options = {
    floor: 0,
    ceil: 2000,
  };
  public priceForm = this._fb.group({
    low: [0],
    high: [2000],
  });
  public ngOnInit() {
    if (this.pricesValue?.length) {
      this.lowTest = this.pricesValue[0];
      this.highTest = this.pricesValue[1];
    }

    this.priceForm.valueChanges.subscribe(({ low, high }) => {
      this.lowTest = low;
      this.highTest = high;
      this.onChange([low, high]);
    });
  }
  writeValue(prices: any): void {
    this.priceForm.setValue(
      { low: prices.low || 0, high: prices.high || 2000 },
      { emitEvent: false }
    );
    this.pricesValue = prices;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  public userChangeEnd() {
    this.priceForm.setValue(
      { low: this.lowTest, high: this.highTest },
      { emitEvent: false }
    );
    this.pricesValue = [this.lowTest, this.highTest];
    console.log(this.pricesValue);
    this.onChange(this.pricesValue);
  }
}
