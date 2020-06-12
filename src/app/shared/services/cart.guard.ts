import { IStore } from 'src/app/store/reducers';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { switchMap, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  selectProducts,
  ICartProduct,
} from 'src/app/store/reducers/cart.reducer';

@Injectable()
export class CartGuard implements CanActivate {
  constructor(
    private readonly store: Store<IStore>,
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectProducts).pipe(
      take(1),
      switchMap((products: ICartProduct[]) => {
        if (products?.length > 0) {
          return of(true);
        }
        // TODO why ?
        //this.store.dispatch(go({ path: ['/'] }));
        return of(false);
      }),
    );
  }
}
