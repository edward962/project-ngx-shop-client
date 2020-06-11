import { createReducer, on } from '@ngrx/store';
import {
  getProductsPending,
  getProductsSuccess,
} from '../actions/products.actions';
import { IProductImage, IFeedback } from '../../content/product/store/reducers/product.reducer';

export interface IProductsState {
  items: IProduct[];
  loading: boolean;
}
export interface IProduct {
  _id: string;
  feedbacksCount: number;
  name: string;
  description: string;
  feedbacks?: IFeedback;
  price: number;
  status: boolean;
  images: IProductImage[];
  rating: number;
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
  })),
);

export function reducerProducts(
  state: IProductsState | undefined,
  // tslint:disable-next-line: no-any
  action: any,
) {
  return productsReducer(state, action);
}
