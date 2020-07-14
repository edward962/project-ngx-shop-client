import { IStore } from 'src/app/store/reducers';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectProducts } from 'src/app/store/reducers/cart.reducer';
import { IProduct } from '../interfaces/product.interface';
import { go } from 'src/app/store/actions/router.actions';

@Injectable()
export class CartGuard implements CanActivate {
  constructor(
    private readonly store: Store<IStore>,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {}

  public canActivate(): Observable<boolean> {
    return this.store.select(selectProducts).pipe(
      take(1),
      // tslint:disable-next-line:typedef
      switchMap((products: IProduct[]) => {
        if (products?.length > 0) {
          return of(true);
        }
        if (!this._router.navigated) {
          this.store.dispatch(go({ path: [''] }));
        }
        return of(false);
      })
    );
  }
}
