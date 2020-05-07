import { createReducer, on } from '@ngrx/store';
import {
  getProductsPending,
  getProductsSuccess,
  getProductsError,
  getProductPending,
  getProductSuccess,
  getProductsPagingSuccess,
  removeFromStateProducts,
} from '../actions/products.actions';

export interface IProductState {
  item: IProduct;
  items: IProduct[];
  loading: boolean;
}

export interface IFeedback {
  rate?: number;
  advantages?: string;
  limitations?: string;
  description?: string;
  product: string;
}
export interface ISearch {
  text: string;
  subcategory: string;
}
export interface IProductImage {
  url: string;
  source: string;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  feedbacks?: IFeedback;
  price: number;
  status: boolean;
  images?: IProductImage[] | undefined;
  rating?: number | undefined;
}

const productsReducer = createReducer(
  {
    item: {
      _id: '',
      description: '',
      name: '',
      price: 0,
      status: false,
    },
    items: [],
    loading: false,
  },
  on(getProductsPending, (state: IProductState) => ({
    ...state,
    loading: true,
  })),
  on(getProductsSuccess, (state: IProductState, { products }) => ({
    ...state,
    items: products,
    loading: false,
  })),
  on(getProductsPagingSuccess, (state: IProductState, { products }) => ({
    ...state,
    items: [...state.items, ...products],
    loading: false,
  })),
  on(removeFromStateProducts, (state: IProductState, _action) => ({
    ...state,
    items: [],
    loading: false,
  })),
  on(getProductPending, (state: IProductState) => ({
    ...state,
    loading: true,
  })),
  on(getProductSuccess, (state: IProductState, { product }) => ({
    ...state,
    item: product,
    loading: false,
  })),
  on(getProductsError, (state: IProductState) => ({
    ...state,
    loading: true,
  })),
);

export function reducerProducts(
  state: IProductState | undefined,
  // tslint:disable-next-line: no-any
  action: any
  ) {
  return productsReducer(state, action);
}
