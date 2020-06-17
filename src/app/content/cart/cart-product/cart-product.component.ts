import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICartProduct } from 'src/app/store/reducers/cart.reducer';
import { IStore } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { go } from 'src/app/store/actions/router.actions';

@Component({
  selector: 'ngx-shop-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.sass'],
})
export class CartProductComponent {
  @Input()
  public product!: ICartProduct;
  @Output()
  public decrement: EventEmitter<ICartProduct> = new EventEmitter<ICartProduct>();

  @Output()
  public increment: EventEmitter<ICartProduct> = new EventEmitter<ICartProduct>();

  @Output()
  public remove: EventEmitter<ICartProduct> = new EventEmitter<ICartProduct>();

  constructor(
    private readonly _store: Store<IStore>,
  ) {
  }

  public decrementProductInCart(product: ICartProduct) {
    this.decrement.emit(product);
  }

  public removeProductFromCart(product: ICartProduct) {
    this.remove.emit(product);
  }

  public incrementProductInCart(product: ICartProduct) {
    this.increment.emit(product);
  }



  public redirectTo(productId: string) {
    this._store.dispatch(
      go({
        path: ['/category/product'],
        query: {
          id: productId
        },
      })
    );
  }
}

