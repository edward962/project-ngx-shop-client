import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ICartProduct,
  selectProducts,
} from 'src/app/store/reducers/cart.reducer';

import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import {
  decrementProductInCart,
  removeProductFromCart,
  incrementProductInCart,
} from '../../store/actions/cart.actions';
import { UnSubscriber } from 'src/app/shared/utils/unsubscriber';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-shop-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent extends UnSubscriber {
  public cart$: Observable<ICartProduct[]> = this._store.select(selectProducts).pipe(takeUntil(this.unsubscribe$$));

  constructor(private readonly _store: Store<IStore>) {
    super()
  }

  public decrementProductInCart(product: ICartProduct) {
    if (product.count > 1) {
      this._store.dispatch(decrementProductInCart({ product }));
      return;
    }
    this._store.dispatch(removeProductFromCart({ product }));
  }

  public removeProductFromCart(product: ICartProduct) {
    this._store.dispatch(removeProductFromCart({ product }));
  }

  public incrementProductInCart(product: ICartProduct) {
    this._store.dispatch(incrementProductInCart({ product }));
  }

  public trackById(_index: number, item: ICartProduct) {
    return item._id;
  }
}
