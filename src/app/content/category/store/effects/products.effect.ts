import {
  getProductsSuccess,
  getProductsPending,
  getProductsError,
} from './../actions/products.actions';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, takeUntil, catchError } from 'rxjs/operators';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Action } from '@ngrx/store';
import { UnSubscriber } from 'src/app/shared/utils/unsubscriber';

@Injectable()
export class ProductsEffects extends UnSubscriber {
  constructor(
    private readonly _actions: Actions,
    private readonly _productsService: ProductsService
  ) {
    super();
  }
  // tslint:disable-next-line:typedef
  public getProducts$: Observable<Action> = createEffect(() =>
    this._actions.pipe(
      ofType(getProductsPending),
      // tslint:disable-next-line:typedef
      switchMap(({ type, ...search }) => {
        return this._productsService.getProductsBySubCategory(search).pipe(
          // tslint:disable-next-line:typedef
          map(({ items: products, prices }) => {
            return getProductsSuccess({ products, prices });
          }),
          catchError(
            (err: Error): Observable<Action> => of(getProductsError({ err }))
          )
        );
      }),
      takeUntil(this.unsubscribe$$)
    )
  );
}
