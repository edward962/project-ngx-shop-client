import { CategoriesService } from './../../shared/services/category.service';
import { ICategory } from './../../interfaces/category.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { IStore } from '../reducers';
import { Store } from '@ngrx/store';
import { getCategoriesPending, getCategoriesSuccess } from '../actions/category.actions';
import { mergeMap, switchMap, map } from 'rxjs/operators';

@Injectable()
export class CartEffects {
    productsService: any;
  constructor(
    private actions: Actions,
    private store: Store<IStore>,
    public categoriesService: CategoriesService
    // private localStorageService: LocalStorageService
  ) {}
    public getCategories$: Observable<any> = createEffect(() =>
    this.actions.pipe(
        ofType(getCategoriesPending),
        switchMap(() => {
          return this.categoriesService.getCategories().pipe(
            map(categories => {
              return getCategoriesSuccess({ categories });
            }),
          );
        }),
      ),);





//   public removeProduct$: Observable<any> = createEffect(() =>
//     this.actions.pipe(
//       ofType(removeProductFromCart),
//       withLatestFrom(this.store.select(selectProducts)),
//       filter(([, products]) => products.length < 1),
//       map(() => {
//         return go({ path: ['/products'] });
//       })
//     )
//   );

//   public toLocalStorage$: Observable<any> = createEffect(
//     () =>
//       this.actions.pipe(
//         ofType(
//           removeProductFromCart,
//           addProductToCart,
//           incrementProductInCart,
//           decrementProductInCart
//         ),
//         withLatestFrom(this.store.select(selectProducts)),
//         tap(([, products]) => {
//           this.localStorageService.addToLocalStorage('cart', products);
//         })
//       ),
//     { dispatch: false }
//   );
}
