import { Action } from '@ngrx/store';
import { BrandsService } from '@shared/services/brands.service';
import {
  getBrandsPending,
  getBrandsSuccess,
  getBrandsError,
} from '../actions/brands.actions';
import { switchMap, map, takeUntil, catchError } from 'rxjs/operators';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UnSubscriber } from '@shared/utils/unsubscriber';

@Injectable()
export class BrandsEffects extends UnSubscriber {
  constructor(
    private readonly _actions: Actions,
    private readonly _brandsService: BrandsService
  ) {
    super();
  }

  public getBrands$: Observable<Action> = createEffect(
    (): Observable<Action> =>
      this._actions.pipe(
        ofType(getBrandsPending),
        switchMap(
          ({ type, ...query }): Observable<Action> => {
            return this._brandsService.getBrands(query).pipe(
              map(
                (data): Action => getBrandsSuccess({ brands: data as string[] })
              ),
              catchError(
                (err: Error): Observable<Action> => of(getBrandsError({ err }))
              )
            );
          }
        ),
        takeUntil(this.unsubscribe$$)
      )
  );
}
