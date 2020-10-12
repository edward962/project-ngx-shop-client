import {
  getSuggestedProductsPending,
  getSuggestedProductsSuccess,
  getSuggestedProductsError,
} from '../actions/suggested-products.actions';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ProductsService } from '@shared/services/products.service';
import { Action } from '@ngrx/store';

@Injectable()
export class SuggestedProductsEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _productsService: ProductsService
  ) {}

  public getSuggestedProducts$: Observable<Action> = createEffect(
    (): Observable<Action> =>
      this._actions.pipe(
        ofType(getSuggestedProductsPending),
        switchMap(
          (): Observable<Action> => {
            return this._productsService.getSuggestedProducts().pipe(
              map(
                ({ items: products }): Action => {
                  return getSuggestedProductsSuccess({ products });
                }
              ),
              catchError(
                (err: Error): Observable<Action> =>
                  of(getSuggestedProductsError({ err }))
              )
            );
          }
        )
      ),
    { useEffectsErrorHandler: true }
  );
}
