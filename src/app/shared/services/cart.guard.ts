import { IStore } from 'src/app/store/reducers';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';

import { switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  selectProducts,
  ICartProduct,
} from 'src/app/store/reducers/cart.reducer';

@Injectable()
export class CartGuard implements CanActivate {
  constructor(private readonly store: Store<IStore>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectProducts).pipe(
      take(1),
      switchMap((products: ICartProduct[]) => {
        if (Array.isArray(products) && products.length > 0) {
          return of(true);
        }
        return of(false);
      })
    );
  }
}
