
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
    private actions: Actions,
    private productsService: ProductsService,
  ) {}
  public getSuggestedProducts$: Observable<any> = createEffect(() =>
      this.actions.pipe(
        ofType(getSuggestedProductsPending),
        switchMap(() => {
          return this.productsService.getSuggestedProducts().pipe(
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
