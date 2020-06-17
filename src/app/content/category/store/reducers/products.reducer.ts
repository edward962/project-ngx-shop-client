import { createReducer, on, Action } from '@ngrx/store';
import {
  getProductsPending,
  getProductsSuccess,
} from '../actions/products.actions';
import {
  IProductImage,
  IFeedback,
} from '../../content/product/store/reducers/product.reducer';

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
  characteristics?: ICharacteristics[];
  price: number;
  status: boolean;
  images: IProductImage[];
  rating: number;
}
export interface IProductApi {
  items: IProduct[];
  quantity: number;
}

interface ICharacteristics {
  title: string;
  items: ICharacteristic[];
}

interface ICharacteristic {
  name: string;
  value: string;
  isExtended: boolean;
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
