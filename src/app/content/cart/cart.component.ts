import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { selectProducts } from 'src/app/store/reducers/cart.reducer';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import {
  decrementProductInCart,
  removeProductFromCart,
  incrementProductInCart,
  clearCart,
} from '../../store/actions/cart.actions';
import { UnSubscriber } from 'src/app/shared/utils/unsubscriber';
import { takeUntil } from 'rxjs/operators';
import { IProduct } from 'src/app/shared/interfaces/product.inteface';
import { FormBuilder } from '@angular/forms';
import { go } from 'src/app/store/actions/router.actions';

@Component({
  selector: 'ngx-shop-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent extends UnSubscriber implements OnDestroy {
  public cart$: Observable<IProduct[]> = this._store
    .select(selectProducts)
    .pipe(takeUntil(this.unsubscribe$$));
  public disabled = false;
  constructor(
    private readonly _store: Store<IStore>,
    private readonly _fb: FormBuilder
  ) {
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
  }
  public comeBack(): void {
    this._store.dispatch(
      go({
        path: [''],
      })
    );
  }
  public ngOnDestroy(): void {
    if (this.disabled === true) {
      this._store.dispatch(clearCart());
    }
  }
}
