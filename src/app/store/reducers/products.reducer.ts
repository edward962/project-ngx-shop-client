import { createReducer, on } from '@ngrx/store';
import {
  getProductsPending,
  getProductsSuccess,
  getProductPending,
  getProductSuccess,
  getSuggestedProductsSuccess,
  getSuggestedProductsPending,
} from '../actions/products.actions';

export interface IProductState {
  item: IProduct;
  items: IProduct[];
  suggestedProducts: IProduct[];
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
    items: [],
    suggestedProducts: [],
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
  on(getProductPending, (state: IProductState) => ({
    ...state,
    loading: true,
  })),
  on(getSuggestedProductsPending, (state: IProductState) => ({
    ...state,
    loading: true,
  })),
  on(getProductSuccess, (state: IProductState, { product }) => ({
    ...state,
    item: product,
    loading: false,
  })),
  on(getSuggestedProductsSuccess, (state: IProductState,  { products } ) => ({
    ...state,
    suggestedProducts:products,
    loading: false,
  })),
);

export function reducerProducts(
  state: IProductState | undefined,
  // tslint:disable-next-line: no-any
  action: any,
) {
  return productsReducer(state, action);
}
