import { routerReducer, RouterStateSerializer } from '@ngrx/router-store';
import {
  ActivatedRouteSnapshot,
  Params,
  RouterStateSnapshot,
} from '@angular/router';
import { reducerCart } from './cart.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { EntityState } from '@ngrx/entity/src';
import { ICategoryState, reducerCategories } from './categories.reducer';
import { IProductsState } from '@category-store/reducers/products.reducer';
import {
  IProductState,
  IProduct,
} from '@product-store/reducers/product.reducer';
import { IBrandsState } from '@category-store/reducers/brands.reducer';

export interface IStore {
  product: IProductState;
  products: IProductsState;
  suggestedProducts: IProductsState;
  cart: EntityState<IProduct>;
  categories: ICategoryState;
  brands: IBrandsState;
  router: typeof routerReducer;
}

interface IReducers {
  cart: EntityState<IProduct>;
  categories: ICategoryState;
}

export const reducers: ActionReducerMap<IReducers> = {
  cart: reducerCart,
  categories: reducerCategories,
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
