import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { addProductToCart } from '@root-store/actions/cart.actions';
import { Store } from '@ngrx/store';
import { IStore } from '@root-store/reducers';
import { IProduct } from '@product-store/reducers/product.reducer';
import { TooltipPosition } from '@shared/directives/directive';

@Component({
	selector: 'ngx-shop-information',
	templateUrl: './information.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
	@Input()
	public product?: IProduct | undefined;

	public isShow = false;

	public position: TooltipPosition = TooltipPosition.LEFT;

	public constructor(private readonly _store: Store<IStore>) {}

	public async addToBasket(product: IProduct | undefined): Promise<void> {
		if (!product) {
			return;
		}
		this._store.dispatch(addProductToCart({ product }));
	}

	public show(): void {
		this.isShow = !this.isShow;
	}
}
