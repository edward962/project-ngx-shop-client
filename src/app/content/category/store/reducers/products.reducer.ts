import { createReducer, on, Action } from '@ngrx/store';
import {
  getProductsPending,
  getProductsSuccess,
  getProductsError,
} from '../actions/products.actions';
import { IProduct } from 'src/app/shared/interfaces/product.interface';

export interface IProductsState {
  items: IProduct[];
  loading: boolean;
  prices: IMinMaxPrice;
}

export interface IProductApi {
  items: IProduct[];
  prices: IMinMaxPrice;
}
export interface IMinMaxPrice {
  min: number;
  max: number;
}

const productsReducer = createReducer(
  {
    items: [],
    loading: false,
    prices: { min: 0, max: 0 },
  },
  // tslint:disable-next-line:typedef
  on(getProductsPending, (state: IProductsState) => ({
    ...state,
    loading: true,
  })),
  // tslint:disable-next-line:typedef
  on(getProductsSuccess, (state: IProductsState, { products, prices }) => ({
    ...state,
    items: products,
    prices,
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
