import { Component, Output, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-price-slider',
  templateUrl: './price-slider.component.html',
  styleUrls: ['./price-slider.component.sass']
})
export class PriceSliderComponent {

  @Output()  pricesValue = new EventEmitter();
  value = 0;
  highValue = 5000;
  options: Options = {
    floor: 0,
    ceil: 5000
  };



 public  userChangeEnd(){
    this.pricesValue.emit({value: this.value, highValue: this.highValue});
  }
}
