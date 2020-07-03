import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { selectProducts } from 'src/app/store/reducers/cart.reducer';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import {
  decrementProductInCart,
  removeProductFromCart,
  incrementProductInCart,
} from '../../store/actions/cart.actions';
import { UnSubscriber } from 'src/app/shared/utils/unsubscriber';
import { takeUntil } from 'rxjs/operators';
import { IProduct } from 'src/app/shared/interfaces/product.inteface';


@Component({
  selector: 'ngx-shop-cart',
  templateUrl: './cart.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent extends UnSubscriber {
  public cart$: Observable<IProduct[]> = this._store
    .select(selectProducts)
    .pipe(takeUntil(this.unsubscribe$$));

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
}
