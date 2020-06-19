import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IStore } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { go } from 'src/app/store/actions/router.actions';
import { IProduct } from 'src/app/shared/interfaces/product.inteface';

@Component({
  selector: 'ngx-shop-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.sass'],
})
export class CartProductComponent {
  @Input()
  public product!: IProduct;
  @Output()
  public decrement: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  @Output()
  public increment: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  @Output()
  public remove: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  constructor(private readonly _store: Store<IStore>) {}

  public decrementProductInCart(product: IProduct) {
    this.decrement.emit(product);
  }

  public removeProductFromCart(product: IProduct) {
    this.remove.emit(product);
  }

  public incrementProductInCart(product: IProduct) {
    this.increment.emit(product);
  }

  public redirectTo(productId: string) {
    this._store.dispatch(
      go({
        path: ['/category/product'],
        query: {
          id: productId,
        },
      })
    );
  }
}
