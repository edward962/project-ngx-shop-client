import { IProductImage } from 'src/app/shared/interfaces/product.interface';
import {
  Component,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  Slider,
  slideAnimation,
  initSliderAnimation,
} from '../../../../../shared/utils/slider';
@Component({
  selector: 'ngx-shop-product-slider',
  templateUrl: './product-slider.component.html',
  animations: [slideAnimation, initSliderAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// @ts-ignore
export class ProductSliderComponent extends Slider<IProductImage> {
  @Input()
  public items: IProductImage[] = [];
  constructor(private readonly _cdr: ChangeDetectorRef) {
    super(_cdr);
  }
}
