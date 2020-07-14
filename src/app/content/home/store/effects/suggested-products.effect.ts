import {
  getSuggestedProductsPending,
  getSuggestedProductsSuccess,
  getSuggestedProductsError,
} from '../actions/suggested-products.actions';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Action } from '@ngrx/store';

@Injectable()
export class SuggestedProductsEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _productsService: ProductsService
  ) {}
  // tslint:disable-next-line:typedef
  public getSuggestedProducts$: Observable<Action> = createEffect(
    // tslint:disable-next-line:typedef
    () =>
      this._actions.pipe(
        ofType(getSuggestedProductsPending),
        // tslint:disable-next-line:typedef
        switchMap(() => {
          return this._productsService.getSuggestedProducts().pipe(
            // tslint:disable-next-line:typedef
            map(({ items: products }) => {
              return getSuggestedProductsSuccess({ products });
            }),
            catchError(
              (err: Error): Observable<Action> =>
                of(getSuggestedProductsError({ err }))
            )
          );
        })
      ),
    { useEffectsErrorHandler: true }
  );
}
