import { UnSubscriber } from '@shared/utils/unsubscriber';
import { IStore } from '@root-store/reducers';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import {
  switchMap,
  mergeMap,
  map,
  withLatestFrom,
  takeUntil,
  catchError,
  tap,
} from 'rxjs/operators';
import { Store, Action } from '@ngrx/store';
import { ProductsService } from '@shared/services/products.service';
import {
  getProductPending,
  getProductSuccess,
  createFeedbackPending,
  createFeedbackSuccess,
  getProductError,
  createFeedbackError,
} from '../actions/product.actions';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { IProduct } from '@product-store/reducers/product.reducer';

@Injectable()
export class ProductEffects extends UnSubscriber {
  constructor(
    private actions: Actions,
    private productsService: ProductsService,
    private store: Store<IStore>,
    private toastr: ToastrService
  ) {
    super();
  }
  public getProduct$: Observable<Action> = createEffect(
    (): Observable<Action> =>
      this.actions.pipe(
        ofType(getProductPending),
        switchMap(
          ({ id }): Observable<Action> =>
            this.productsService.getProductById(id).pipe(
              map(
                (product: IProduct): Action => {
                  return getProductSuccess({ product });
                }
              ),
              catchError(
                (err: Error): Observable<Action> => of(getProductError({ err }))
              )
            )
        ),
        takeUntil(this.unsubscribe$$)
      )
  );

  public addFeedback$: Observable<Action> = createEffect(
    (): Observable<Action> =>
      this.actions.pipe(
        ofType(createFeedbackPending),
        withLatestFrom(this.store.select('product', 'item', '_id')),
        switchMap(
          ([{ feedback }, product]): Observable<Action> =>
            this.productsService.createFeedback(feedback, product).pipe(
              tap(
                (): ActiveToast<String> =>
                  this.toastr.info('Вы успешно добавили отзыв')
              ),
              mergeMap(({ rating }: { rating: number }): Action[] => [
                createFeedbackSuccess({
                  feedback: { ...feedback, product },
                  rating,
                }),
              ]),
              catchError(
                (err: Error): Observable<Action> =>
                  of(createFeedbackError({ err }))
              )
            )
        ),

        takeUntil(this.unsubscribe$$)
      )
  );
}
