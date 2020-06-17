import {
  getSuggestedProductsPending,
  getSuggestedProductsSuccess,
} from '../actions/suggested-products.actions';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import {
  switchMap,
  map,
} from 'rxjs/operators';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Action } from '@ngrx/store';


@Injectable()
export class SuggestedProductsEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _productsService: ProductsService,
  ) {}
  public getSuggestedProducts$: Observable<Action> = createEffect(() =>
      this._actions.pipe(
        ofType(getSuggestedProductsPending),
        switchMap(() => {
          return this._productsService.getSuggestedProducts().pipe(
            map(( { items: products }) => {
              return getSuggestedProductsSuccess( { products} );
            }),
          );
        }),
      ),
    );
  };
