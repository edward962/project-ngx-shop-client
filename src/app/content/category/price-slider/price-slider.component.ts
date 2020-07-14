import { Component, OnInit, Input } from '@angular/core';
import { Options } from 'ng5-slider';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
  Validators,
} from '@angular/forms';

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
  public onChange!: Function;
  @Input()
  public set min(value: number) {
    if (value === undefined) {
      return;
    }
    console.log(value);
    this.options = { ...this.options, floor: value };
  }
  @Input()
  public set max(value: number) {
    if (value === undefined) {
      return;
    }
    console.log(value);
    this.options = { ...this.options, ceil: value };
  }
  public low = 0;
  public high = 0;
  public options: Options = {
    animate: false,
    hideLimitLabels: true,
    hidePointerLabels: true,
  };
  public priceForm = this._fb.group({
    low: [this.min, Validators.min(this.min)],
    high: [this.max, Validators.max(this.max)],
  });
  public ngOnInit(): void {
    // this.low = this.min;
    // this.high = this.max;
    // this.priceForm.valueChanges.subscribe(({ low, high }): void => {
    //   this.low = low;
    //   this.high = high;
    // });
  }
  public writeValue(prices: number[]): void {
    console.log('HUY');
    this.low = prices[0] || (this.options.floor as number);
    this.high = prices[1] || (this.options.ceil as number);
    this.priceForm.setValue({
      low: this.low,
      high: this.high,
    });
    // this.pricesValue = prices;
  }

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  public registerOnTouched(): void {}

  public userChangeEnd(): void {
    this.priceForm.setValue({ low: this.low, high: this.high });
    this.onChange([this.low, this.high]);
    // this.pricesValue = [this.low, this.high];
  }
  public userChange(): void {
    this.priceForm.setValue({ low: this.low, high: this.high });
  }
}
