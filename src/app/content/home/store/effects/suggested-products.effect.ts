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

@Injectable()
export class SuggestedProductsEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _productsService: ProductsService,
  ) {}
  public getSuggestedProducts$: Observable<any> = createEffect(() =>
      this._actions.pipe(
        ofType(getSuggestedProductsPending),
        switchMap(() => {
          return this._productsService.getSuggestedProducts().pipe(
            // tslint:disable-next-line: no-any
            map((_products: any) => {
              const products = _products.items;
              return getSuggestedProductsSuccess( {products} );
            }),
          );
        }),
      ),
    );
  };
