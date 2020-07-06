import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceSliderComponent implements ControlValueAccessor, OnInit {
  constructor(private readonly _fb: FormBuilder) {}
  @Input()
  public pricesValue?: number[];
  public onChange!: Function;
  public low = 0;
  public high = 2000;
  public options: Options = {
    animate: false,
    floor: 0,
    hideLimitLabels: true,
    hidePointerLabels: true,
    ceil: 2000,
  };
  public priceForm = this._fb.group({
    low: [0],
    high: [2000],
  });
  public ngOnInit(): void {
    if (this.pricesValue?.length) {
      this.low = this.pricesValue[0];
      this.high = this.pricesValue[1];
    }

    this.priceForm.valueChanges.subscribe(({ low, high }): void => {
      this.low = low;
      this.high = high;
      this.onChange([low, high]);
    });
  }
  public writeValue(prices: number[]): void {
    this.priceForm.setValue(
      { low: prices[0] || 0, high: prices[1] || 2000 },
      { emitEvent: false }
    );
    this.pricesValue = prices;
  }

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  public registerOnTouched(): void {}

  public userChangeEnd(): void {
    this.priceForm.setValue(
      { low: this.low, high: this.high },
      { emitEvent: false }
    );
    this.pricesValue = [this.low, this.high];
    this.onChange(this.pricesValue);
  }
  public userChange(): void {
    this.priceForm.setValue(
      { low: this.low, high: this.high },
      { emitEvent: false }
    );
    this.pricesValue = [this.low, this.high];
  }
}
