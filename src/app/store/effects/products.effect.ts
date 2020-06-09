import { IStore } from 'src/app/store/reducers';
import {
  getProductsSuccess,
  getProductSuccess,
  getProductPending,
  getProductsPending,
  createFeedbackPending,
  createFeedbackSuccess,
  getSuggestedProductsPending,
  getSuggestedProductsSuccess,
} from './../actions/products.actions';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';

import {
  switchMap,
  map,
  withLatestFrom,
  mergeMap,
} from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { ProductsService } from 'src/app/shared/services/products.service';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions: Actions,
    private productsService: ProductsService,
    private store: Store<IStore>,
  ) {
  }

  // tslint:disable-next-line: no-any
  public getProduct$: Observable<any> = createEffect(() =>
    this.actions.pipe(
      ofType(getProductPending),
      switchMap(({ id }) =>
        this.productsService
          .getProductById(id)
          .pipe(
            // tslint:disable-next-line: no-any
            map((product: any) => {
              return getProductSuccess({ product });
            }),
          ),
      ),
    ),
  );
  // tslint:disable-next-line: no-any
  public addFeedback$: Observable<any> = createEffect(() =>
    this.actions.pipe(
      ofType(createFeedbackPending),
      withLatestFrom(this.store.select('products', 'item', '_id')),
      switchMap(([{ feedback }, product]) =>
        this.productsService
          .createFeedback({ ...feedback, product })
          .pipe(
            mergeMap(() => [
              createFeedbackSuccess(),
              getProductPending({ id: product }),
            ]),
          ),
      ),
    ),
  );


  // tslint:disable-next-line: no-any
  public getProducts$: Observable<any> = createEffect(() =>
    this.actions.pipe(
      ofType(getProductsPending),
      switchMap(({ type, ...search }) => {
        return this.productsService.getProductsBySubCategory(search).pipe(
          // tslint:disable-next-line: no-any
          map((_products: any) => {
            const products = _products.items;
            return getProductsSuccess({ products });
          }),
        );
      }),
    ),
  );



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
}
