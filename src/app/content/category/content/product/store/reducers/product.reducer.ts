import { createReducer, on, Action } from '@ngrx/store';
import {
  getProductPending,
  getProductSuccess,
} from '../actions/product.actions';
import { IProduct } from 'src/app/shared/interfaces/product.inteface';

export interface IProductState {
  item: IProduct;
  loading: boolean;
}

export interface ISearch {
  text: string;
  subcategory: string;
}

const productReducer = createReducer(
  {
    item: {
      _id: '',
      description: '',
      feedbacksCount: 0,
      name: '',
      price: 0,
      images: [],
      status: false,
      rating: 0,
    },
    loading: false,
  },
  // tslint:disable-next-line:typedef
  on(getProductPending, (state: IProductState) => ({
    ...state,
    loading: true,
  })),
  // tslint:disable-next-line:typedef
  on(getProductSuccess, (state: IProductState, { product }) => ({
    ...state,
    item: product,
    loading: false,
  }))
);

export function reducerProduct(
  state: IProductState | undefined,
  action: Action
): {
    item: IProduct;
    loading: boolean;
} {
  return productReducer(state, action);
}
