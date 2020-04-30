import { routerReducer, RouterStateSerializer } from '@ngrx/router-store';
import {
  ActivatedRouteSnapshot,
  Params,
  RouterStateSnapshot,
} from '@angular/router';

import { ICartProduct, reducerCart } from './cart.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { EntityState } from '@ngrx/entity/src';
import { reducerCategories } from './categories.reducer';
import { reducerProducts, IProductState } from './products.reducer';

export interface IStore {
  products: IProductState;
  cart: EntityState<ICartProduct>;
  routerReducer: typeof routerReducer;
}

export const reducers: ActionReducerMap<any> = {
  cart: reducerCart,
  categories: reducerCategories,
  products: reducerProducts
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
