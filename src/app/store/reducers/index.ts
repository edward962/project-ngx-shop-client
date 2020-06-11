import { routerReducer, RouterStateSerializer } from '@ngrx/router-store';
import {
  ActivatedRouteSnapshot,
  Params,
  RouterStateSnapshot,
} from '@angular/router';

import { ICartProduct, reducerCart } from './cart.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { EntityState } from '@ngrx/entity/src';
import { ICategoryState, reducerCategories } from './categories.reducer';
import { IProductsState } from 'src/app/content/category/store/reducers/products.reducer';
import { IProductState } from 'src/app/content/category/content/product/store/reducers/product.reducer';
import { ISuggestedProductsState } from 'src/app/content/home/store/reducers/suggested-products.reducer';

export interface IStore {
  product:IProductState,
  products: IProductsState;
  suggestedProducts: ISuggestedProductsState;
  cart: EntityState<ICartProduct>;
  categories: ICategoryState;
  routerReducer: typeof routerReducer;
}

// tslint:disable-next-line: no-any
export const reducers: ActionReducerMap<any> = {
  cart: reducerCart,
  categories: reducerCategories,
  //TODO router ?
};

export interface IRouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export class CustomRouterSerializer
  implements RouterStateSerializer<IRouterStateUrl> {
  public serialize(routerState: RouterStateSnapshot): IRouterStateUrl {
    const {
      url,
      root: { queryParams },
    } = routerState;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;
    return { url, queryParams, params };
  }
}
