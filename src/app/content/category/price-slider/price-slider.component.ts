import { Component, Output, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-price-slider',
  templateUrl: './price-slider.component.html',
})
export class PriceSliderComponent {

  @Output()  public pricesValue = new EventEmitter();
  public value = 0;
  public highValue = 2000;
  public options: Options = {
    floor: 0,
    ceil: 2000,
  };



 public  userChangeEnd() {
    this.pricesValue.emit({value: this.value, highValue: this.highValue});
  }
}
