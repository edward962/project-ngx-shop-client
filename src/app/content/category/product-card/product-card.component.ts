import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStore } from '@root-store/reducers';
import { addProductToCart } from '@root-store/actions/cart.actions';
import { go } from '@root-store/actions/router.actions';
import { IProduct } from '@product-store/reducers/product.reducer';
import { TooltipPosition } from '@shared/directives/directive';

@Component({
	selector: 'ngx-shop-content-product',
	templateUrl: './product-card.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryProductComponent {
	@Input()
	public product!: IProduct;

	@Input()
	public subCategory!: string;

	public position: TooltipPosition = TooltipPosition.LEFT;

	public constructor(private readonly _store: Store<IStore>) {}

	public async addToBasket(product: IProduct | undefined): Promise<void> {
		if (!product) {
			return;
		}
		this._store.dispatch(addProductToCart({ product }));
	}

	public redirectTo(): void {
		window.scroll(0, 0);
		this._store.dispatch(
			go({
				path: ['/category', this.product.subCategory, this.product._id],
			}),
		);
	}
}
