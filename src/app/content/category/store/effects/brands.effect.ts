import { Action } from '@ngrx/store';
import { BrandsService } from '../../../../shared/services/brands.service';
import { getBrandsPending, getBrandsSuccess } from '../actions/brands.actions';
import { switchMap, map } from 'rxjs/operators';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class BrandsEffects {
  constructor(private actions: Actions, private brandsService: BrandsService) {}
  public getBrands$: Observable<any> = createEffect(() =>
    this.actions.pipe(
      ofType(getBrandsPending),
      switchMap(({ id, priceRange: prices }) => {
        return this.brandsService
          .getBrands({ prices, id })
          .pipe(map((data) => getBrandsSuccess({ brands: data as string[] })));
      })
    )
  );
}
