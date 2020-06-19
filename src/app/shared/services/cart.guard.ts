import { IStore } from 'src/app/store/reducers';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';

import { switchMap, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectProducts } from 'src/app/store/reducers/cart.reducer';
import { IProduct } from '../interfaces/product.inteface';

@Injectable()
export class CartGuard implements CanActivate {
  constructor(private readonly store: Store<IStore>) {}

  public canActivate(): Observable<boolean> {
    return this.store.select(selectProducts).pipe(
      take(1),
      switchMap((products: IProduct[]) => {
        if (products?.length > 0) {
          return of(true);
        }
        return of(false);
      })
    );
  }
}
