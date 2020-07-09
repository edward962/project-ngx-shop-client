import { createReducer, on, Action } from '@ngrx/store';
import {
  getProductsPending,
  getProductsSuccess,
  getProductsError,
} from '../actions/products.actions';
import { IProduct } from 'src/app/shared/interfaces/product.inteface';

export interface IProductsState {
  items: IProduct[];
  loading: boolean;
}

export interface IProductApi {
  items: IProduct[];
  quantity: number;
}

const productsReducer = createReducer(
  {
    items: [],
    loading: false,
  },
  // tslint:disable-next-line:typedef
  on(getProductsPending, (state: IProductsState) => ({
    ...state,
    loading: true,
  })),
  // tslint:disable-next-line:typedef
  on(getProductsSuccess, (state: IProductsState, { products }) => ({
    ...state,
    items: products,
    loading: false,
  })),
  // tslint:disable-next-line:typedef
  on(getProductsError, (state: IProductsState) => ({
    ...state,
    loading: false,
  }))
);

export function reducerProducts(
  state: IProductsState | undefined,
  action: Action
): {
  items: IProduct[];
  loading: boolean;
} {
  return productsReducer(state, action);
}
