import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
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
  constructor(private fb: FormBuilder) {}

  public pricesValue: any = {};
  public onChange!: Function;
  public value = 0;
  public highValue = 2000;
  public options: Options = {
    floor: 0,
    ceil: 2000,
  };
  public priceForm = this.fb.group({
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
  writeValue(prices: any): void {
    //console.log(prices);
    // this.pricesValue = { value, highValue };
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
