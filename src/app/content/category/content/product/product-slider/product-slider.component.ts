import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { IProductImage } from '@product-store/reducers/product.reducer';
import { Slider, slideAnimation, initSliderAnimation } from '@shared/utils/slider';

@Component({
	selector: 'ngx-shop-product-slider',
	templateUrl: './product-slider.component.html',
	animations: [slideAnimation, initSliderAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSliderComponent extends Slider<IProductImage> {
	@Input()
	public items: IProductImage[] | undefined = [];

	public constructor(_cdr: ChangeDetectorRef) {
		super(_cdr);
	}
}
