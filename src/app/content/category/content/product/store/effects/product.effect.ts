import { IStore } from 'src/app/store/reducers';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import {
  switchMap,
  mergeMap,
  map,
  withLatestFrom,
} from 'rxjs/operators';
import { Store, Action } from '@ngrx/store';
import { ProductsService } from '../../../../../../shared/services/products.service';
import { getProductPending, getProductSuccess, createFeedbackPending, createFeedbackSuccess } from '../actions/product.actions';
import { IProduct } from 'src/app/content/category/store/reducers/products.reducer';


@Injectable()
export class ProductEffects {
  constructor(
    private actions: Actions,
    private productsService: ProductsService,
    private store: Store<IStore>,
  ) { }

  public getProduct$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(getProductPending),
      switchMap(({ id }) =>
        this.productsService
          .getProductById(id)
          .pipe(
            map((product: IProduct) => {
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
      withLatestFrom(this.store.select('product', 'item', '_id')),
      switchMap(([{ feedback }, product]) =>
        this.productsService
          .createFeedback(feedback, product)
          .pipe(
            mergeMap(() => [
              createFeedbackSuccess(),
              getProductPending({ id: product }),
            ]),
          ),
      ),
    ),
  );
}
