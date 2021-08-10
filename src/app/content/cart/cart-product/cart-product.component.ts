import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { IStore } from '@root-store/reducers';
import { Store } from '@ngrx/store';
import { go } from '@root-store/actions/router.actions';
import { IProduct } from '@product-store/reducers/product.reducer';

@Component({
	selector: 'ngx-shop-cart-product',
	templateUrl: './cart-product.component.html',
	styleUrls: ['./cart-product.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProductComponent {
	@Input()
	public product!: IProduct;

	@Input()
	public disabled?: boolean;

	@Output()
	public decrement: EventEmitter<IProduct> = new EventEmitter<IProduct>();

	@Output()
	public increment: EventEmitter<IProduct> = new EventEmitter<IProduct>();

	@Output()
	public remove: EventEmitter<IProduct> = new EventEmitter<IProduct>();

	public constructor(private readonly _store: Store<IStore>) {}

	public decrementProductInCart(product: IProduct): void {
		this.decrement.emit(product);
	}

	public removeProductFromCart(product: IProduct): void {
		this.remove.emit(product);
	}

	public incrementProductInCart(product: IProduct): void {
		this.increment.emit(product);
	}

	public redirectTo(): void {
		this._store.dispatch(
			go({
				path: ['/category', this.product.subCategory, this.product._id],
			}),
		);
	}
}
