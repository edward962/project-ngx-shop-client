import { Action } from '@ngrx/store';
import { BrandsService } from '../../../../shared/services/brands.service';
import {
  getBrandsPending,
  getBrandsSuccess,
  getBrandsError,
} from '../actions/brands.actions';
import { switchMap, map, takeUntil, catchError } from 'rxjs/operators';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UnSubscriber } from 'src/app/shared/utils/unsubscriber';

@Injectable()
export class BrandsEffects extends UnSubscriber {
  constructor(
    private readonly _actions: Actions,
    private readonly _brandsService: BrandsService
  ) {
    super();
  }
  // tslint:disable-next-line: typedef
  public getBrands$: Observable<Action> = createEffect(() =>
    this._actions.pipe(
      ofType(getBrandsPending),
      // tslint:disable-next-line: typedef
      switchMap(({ type, ...query }) => {
        return (
          this._brandsService
            .getBrands(query)
            // tslint:disable-next-line:typedef
            .pipe(
              // tslint:disable-next-line:typedef
              map((data) => getBrandsSuccess({ brands: data as string[] })),
              catchError(
                (err: Error): Observable<Action> => of(getBrandsError({ err }))
              )
            )
        );
      }),
      takeUntil(this.unsubscribe$$)
    )
  );
}
