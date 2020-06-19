import { createReducer, on, Action } from '@ngrx/store';
import {
  getProductsPending,
  getProductsSuccess,
} from '../actions/products.actions';
import { IProduct } from 'src/app/shared/interfaces/product.inteface';

export interface IProductsState {
  items: IProduct[];
  loading: boolean;
}

export interface IProducts {
  items: IProduct[];
  quantity: number;
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
  on(getProductsPending, (state: IProductsState) => ({
    ...state,
    loading: true,
  })),
  on(getProductsSuccess, (state: IProductsState, { products }) => ({
    ...state,
    items: products,
    loading: false,
  }))
);

export function reducerProducts(
  state: IProductsState | undefined,
  action: Action
) {
  return productsReducer(state, action);
}
