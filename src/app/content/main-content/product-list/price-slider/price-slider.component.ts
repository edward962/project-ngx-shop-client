import { Component, Output, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-price-slider',
  templateUrl: './price-slider.component.html',
  styleUrls: ['./price-slider.component.sass']
})
export class PriceSliderComponent {
  public input$: any;

  @Output()  pricesValue = new EventEmitter();
  value = 40;
  highValue = 60;
  options: Options = {
    floor: 0,
    ceil: 10000
  };



 public  Change(){
    this.pricesValue.emit({value: this.value, highValue: this.highValue});
  }
}
