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
import { IStore } from 'src/app/store/reducers';
import { map, filter, tap, catchError, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { removeProductFromCart } from '../actions/cart.actions';
import { Store, Action } from '@ngrx/store';
import { selectProducts } from '../reducers/cart.reducer';
import { go } from '../actions/router.actions';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CartEffects {
  constructor(
    private actions: Actions,
    private store: Store<IStore>,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService
  ) {}
  // tslint:disable-next-line:typedef
  public removeProduct$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(removeProductFromCart),
      withLatestFrom(this.store.select(selectProducts)),
      // tslint:disable-next-line:typedef
      filter(([, products]) => products.length < 1),
      // tslint:disable-next-line:typedef
      map(() => {
        return go({ path: ['/'] });
      }),
      catchError(
        (err: Error): Observable<Action> =>
          of(removeProductFromCartError({ err }))
      )
    )
  );
  public removeProducts$: Observable<Action> = createEffect(
    // tslint:disable-next-line:typedef
    () =>
      this.actions.pipe(
        ofType(removeProductsFromCartPending),
        // tslint:disable-next-line:typedef
        tap(() => {
          this.localStorageService.removeFromLocalStorage('cart');
        }),
        // tslint:disable-next-line:typedef
        map(() => removeProductsFromCartSuccess())
      )
  );
  // tslint:disable-next-line:typedef
  public toLocalStorage$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(
        removeProductFromCart,
        addProductToCart,
        incrementProductInCart,
        decrementProductInCart
      ),
      withLatestFrom(this.store.select(selectProducts)),
      // tslint:disable-next-line:typedef
      tap(([, products]) => {
        this.localStorageService.addToLocalStorage('cart', products);
      }),
      // tslint:disable-next-line:typedef
      map(() => cartSuccess())
    )
  );
  public addProductToStorage$: Observable<Action> = createEffect(
    // tslint:disable-next-line:typedef
    () =>
      this.actions.pipe(
        ofType(addProductToCart),
        // tslint:disable-next-line:typedef
        tap(() => {
          this.toastr.info('Товар добавлен.');
          return cartSuccess();
        })
      ),
    { dispatch: false }
  );
}
