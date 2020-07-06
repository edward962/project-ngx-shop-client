import { UnSubscriber } from './../../../../../../shared/utils/unsubscriber';
import { IStore } from 'src/app/store/reducers';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import {
  switchMap,
  mergeMap,
  map,
  withLatestFrom,
  takeUntil,
} from 'rxjs/operators';
import { Store, Action } from '@ngrx/store';
import { ProductsService } from '../../../../../../shared/services/products.service';
import {
  getProductPending,
  getProductSuccess,
  createFeedbackPending,
  createFeedbackSuccess,
} from '../actions/product.actions';
import { IProduct } from 'src/app/shared/interfaces/product.inteface';

@Injectable()
export class ProductEffects extends UnSubscriber {
  constructor(
    private actions: Actions,
    private productsService: ProductsService,
    private store: Store<IStore>
  ) {
    super();
  }

  // tslint:disable-next-line:typedef
  public getProduct$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(getProductPending),
      // tslint:disable-next-line:typedef
      switchMap(({ id }) =>
        this.productsService.getProductById(id).pipe(
          // tslint:disable-next-line:typedef
          map((product: IProduct) => {
            return getProductSuccess({ product });
          })
        )
      ),
      takeUntil(this.unsubscribe$$)
    )
  );
  // tslint:disable-next-line:typedef
  public addFeedback$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(createFeedbackPending),
      withLatestFrom(this.store.select('product', 'item', '_id')),
      // tslint:disable-next-line:typedef
      switchMap(([{ feedback }, product]) =>
        this.productsService.createFeedback(feedback, product).pipe(
          // tslint:disable-next-line:typedef
          mergeMap(({ rating }: { rating: number }) => [
            createFeedbackSuccess({
              feedback: { ...feedback, product },
              rating,
            }),
            // getProductPending({ id: product }),
          ])
        )
      ),
      takeUntil(this.unsubscribe$$)
    )
  );
}
