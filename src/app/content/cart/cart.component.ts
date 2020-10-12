import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { selectProducts } from '@root-store/reducers/cart.reducer';
import { Store } from '@ngrx/store';
import { IStore } from '@root-store/reducers';
import {
  decrementProductInCart,
  removeProductFromCart,
  incrementProductInCart,
  removeProductsFromCartPending,
} from '@root-store/actions/cart.actions';
import { go } from '@root-store/actions/router.actions';
import { takeWhile, takeUntil } from 'rxjs/operators';

import { UnSubscriber } from '@shared/utils/unsubscriber';
import { IProduct } from '@product-store/reducers/product.reducer';
@Component({
  selector: 'ngx-shop-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent extends UnSubscriber {
  public cart$: Observable<IProduct[]> = this._store
    .select(selectProducts)
    .pipe(
      takeWhile((): boolean => !this.disabled),
      takeUntil(this.unsubscribe$$)
    );
  public disabled = false;
  constructor(private readonly _store: Store<IStore>) {
    super();
  }

  public decrementProductInCart(product: IProduct): void {
    if (product.count && product.count > 1) {
      this._store.dispatch(decrementProductInCart({ product }));
      return;
    }
    this._store.dispatch(removeProductFromCart({ product }));
  }

  public removeProductFromCart(product: IProduct): void {
    this._store.dispatch(removeProductFromCart({ product }));
  }

  public incrementProductInCart(product: IProduct): void {
    this._store.dispatch(incrementProductInCart({ product }));
  }

  public trackById(_index: number, item: IProduct): string {
    return item._id;
  }
  public confirm(): void {
    this.disabled = true;
    this._store.dispatch(removeProductsFromCartPending());
  }
  public comeBack(): void {
    this._store.dispatch(
      go({
        path: [''],
      })
    );
  }
}
