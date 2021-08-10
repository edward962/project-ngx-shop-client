import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IProduct } from '@product-store/reducers/product.reducer';

@Component({
	selector: 'ngx-shop-product-description',
	templateUrl: './description.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionComponent {
	@Input() public product!: IProduct;

	public isShowDescription = true;

	public close!: () => void;

	public save!: (value: object) => void;

	public toggleTab(): void {
		this.isShowDescription = !this.isShowDescription;
	}
}
