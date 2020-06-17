import { Action } from '@ngrx/store';
import { BrandsService } from '../../../../shared/services/brands.service';
import { getBrandsPending, getBrandsSuccess } from '../actions/brands.actions';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnSubscriber } from 'src/app/shared/utils/unsubscriber';

@Injectable()
export class BrandsEffects extends UnSubscriber {
  constructor(
    private readonly _actions: Actions,
    private readonly _brandsService: BrandsService
  ) {
    super();
  }
  public getBrands$: Observable<Action> = createEffect(() =>
    this._actions.pipe(
      ofType(getBrandsPending),
      switchMap(({ id, priceRange: prices }) => {
        return this._brandsService
          .getBrands({ prices, id })
          .pipe(map((data) => getBrandsSuccess({ brands: data as string[] })));
      }),
      takeUntil(this.unsubscribe$$)
    )
  );
}
