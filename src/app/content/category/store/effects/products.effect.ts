import {
  getProductsSuccess,
  getProductsPending,
  getProductsError,
} from './../actions/products.actions';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, takeUntil, catchError } from 'rxjs/operators';
import { ProductsService } from '@shared/services/products.service';
import { Action } from '@ngrx/store';
import { UnSubscriber } from '@shared/utils/unsubscriber';

@Injectable()
export class ProductsEffects extends UnSubscriber {
  constructor(
    private readonly _actions: Actions,
    private readonly _productsService: ProductsService
  ) {
    super();
  }
  public getProducts$: Observable<Action> = createEffect(
    (): Observable<Action> =>
      this._actions.pipe(
        ofType(getProductsPending),
        switchMap(
          ({ type, ...search }): Observable<Action> => {
            return this._productsService.getProductsBySubCategory(search).pipe(
              map(
                ({ items: products, prices }): Action => {
                  return getProductsSuccess({ products, prices });
                }
              ),
              catchError(
                (err: Error): Observable<Action> =>
                  of(getProductsError({ err }))
              )
            );
          }
        ),
        takeUntil(this.unsubscribe$$)
      )
  );
}
