import { UnSubscriber } from './../../../../../../shared/utils/unsubscriber';
import { IStore } from 'src/app/store/reducers';
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
import { ProductsService } from '../../../../../../shared/services/products.service';
import {
  getProductPending,
  getProductSuccess,
  createFeedbackPending,
  createFeedbackSuccess,
  getProductError,
  createFeedbackError,
} from '../actions/product.actions';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ToastrService } from 'ngx-toastr';

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
          }),
          catchError(
            (err: Error): Observable<Action> => of(getProductError({ err }))
          )
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
          tap(() => this.toastr.info('Вы успешно добавили отзыв')),
          // tslint:disable-next-line:typedef
          mergeMap(({ rating }: { rating: number }) => [
            createFeedbackSuccess({
              feedback: { ...feedback, product },
              rating,
            }),
          ]),
          catchError(
            (err: Error): Observable<Action> => of(createFeedbackError({ err }))
          )
        )
      ),
      takeUntil(this.unsubscribe$$)
    )
  );
}
