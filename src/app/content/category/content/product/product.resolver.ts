// import { getProductPending } from '@content/category/content/product/store/actions/product.actions';
// import { go } from '@root-store/actions/router.actions';
// import { IStore } from '@root-store/reducers/index';
// import { Store } from '@ngrx/store';
// import {
//   Resolve,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import { Injectable } from '@angular/core';
// import { skip, take, tap } from 'rxjs/operators';

// @Injectable()
// export class ProductResolver implements Resolve<IProduct> {
//   constructor(private _store: Store<IStore>) {}

//   public resolve(
//     route: ActivatedRouteSnapshot,
//     _state: RouterStateSnapshot
//   ): Observable<IProduct> | Promise<IProduct> | IProduct {
//     const { product } = route.params;
//     this._store.dispatch(getProductPending({ id: product }));
//     return this._store.select('product').pipe(
//       skip(1),
//       take(1),
//       tap((p: any): void => {
//         if (!p.item) {
//           this._store.dispatch(go({ path: [''] }));
//         }
//       })
//     );
//   }
// }
