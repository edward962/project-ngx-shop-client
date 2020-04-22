import { Component } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-price-slider',
  templateUrl: './price-slider.component.html',
  styleUrls: ['./price-slider.component.sass']
})
export class PriceSliderComponent {
  value = 40;
  highValue = 60;
  options: Options = {
    floor: 0,
    ceil: 100
  };
}
