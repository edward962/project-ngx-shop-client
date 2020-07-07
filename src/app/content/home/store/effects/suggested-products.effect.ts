import {
  getSuggestedProductsPending,
  getSuggestedProductsSuccess,
} from '../actions/suggested-products.actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Action } from '@ngrx/store';

@Injectable()
export class SuggestedProductsEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _productsService: ProductsService
  ) {}
  // tslint:disable-next-line:typedef
  public getSuggestedProducts$: Observable<Action> = createEffect(() =>
    this._actions.pipe(
      ofType(getSuggestedProductsPending),
      // tslint:disable-next-line:typedef
      switchMap(() => {
        return this._productsService.getSuggestedProducts().pipe(
          // tslint:disable-next-line:typedef
          map(({ items: products }) => {
            return getSuggestedProductsSuccess({ products });
          })
        );
      })
    )
  );
}
