import { IStore } from '@root-store/reducers';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectProducts } from '@root-store/reducers/cart.reducer';
import { go } from '@root-store/actions/router.actions';
import { IProduct } from '@product-store/reducers/product.reducer';

@Injectable()
export class CartGuard implements CanActivate {
  constructor(
    private readonly store: Store<IStore>,
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
