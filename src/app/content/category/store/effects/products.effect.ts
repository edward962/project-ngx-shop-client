import {
  getProductsSuccess,
  getProductsPending,
} from './../actions/products.actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, takeUntil } from 'rxjs/operators';
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
  public getProducts$: Observable<Action> = createEffect(() =>
    this._actions.pipe(
      ofType(getProductsPending),
      switchMap(({ type, ...search }) => {
        return this._productsService.getProductsBySubCategory(search).pipe(
          map(({ items }) => {
            return getProductsSuccess({ products: items });
          })
        );
      }),
      takeUntil(this.unsubscribe$$)
    )
  );
}
