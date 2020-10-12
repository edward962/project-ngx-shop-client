import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addProductToCart,
  incrementProductInCart,
  decrementProductInCart,
  cartSuccess,
  removeProductFromCartError,
  removeProductsFromCartPending,
  removeProductsFromCartSuccess,
} from './../actions/cart.actions';
import { IStore } from '@root-store/reducers';
import { map, filter, tap, catchError, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { removeProductFromCart } from '../actions/cart.actions';
import { Store, Action } from '@ngrx/store';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { go } from '@root-store/actions/router.actions';
import { IProduct } from '@product-store/reducers/product.reducer';
import { selectProducts } from '@root-store/reducers/cart.reducer';
@Injectable()
export class CartEffects {
  constructor(
    private readonly actions: Actions,
    private readonly store: Store<IStore>,
    private readonly localStorageService: LocalStorageService,
    private readonly _toastr: ToastrService
  ) {}

  public removeProduct$: Observable<Action> = createEffect(
    (): Observable<Action> =>
      this.actions.pipe(
        ofType(removeProductFromCart),
        withLatestFrom(this.store.select(selectProducts)),
        filter(
          ([, products]: [{}, IProduct[]]): boolean => products.length < 1
        ),
        map(
          (): Action => {
            return go({ path: ['/'] });
          }
        ),
        catchError(
          (err: Error): Observable<Action> =>
            of(removeProductFromCartError({ err }))
        )
      )
  );
  public removeProducts$: Observable<Action> = createEffect(
    (): Observable<Action> =>
      this.actions.pipe(
        ofType(removeProductsFromCartPending),
        tap((): void => {
          this.localStorageService.removeFromLocalStorage('cart');
        }),
        map((): Action => removeProductsFromCartSuccess())
      )
  );
  public toLocalStorage$: Observable<Action> = createEffect(
    (): Observable<Action> =>
      this.actions.pipe(
        ofType(
          removeProductFromCart,
          addProductToCart,
          incrementProductInCart,
          decrementProductInCart
        ),
        withLatestFrom(this.store.select(selectProducts)),
        tap(([, products]: [{}, IProduct[]]): void => {
          this.localStorageService.addToLocalStorage('cart', products);
        }),
        map((): Action => cartSuccess())
      )
  );
  public addProductToStorage$: Observable<Action> = createEffect(
    (): Observable<Action> =>
      this.actions.pipe(
        ofType(addProductToCart),
        tap(
          (): Action => {
            this._toastr.info('Товар добавлен.');
            return cartSuccess();
          }
        )
      ),
    { dispatch: false }
  );
}
