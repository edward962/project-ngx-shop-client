import { createReducer, on } from '@ngrx/store';

import { getProductSuccess, getProductPending } from 'src/app/store/actions/products.actions';

export interface IProductState {
  item: IProduct;
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
  on(getProductPending, (state: IProductState) => ({
    ...state,
    loading: true,
  })),
  on(getProductSuccess, (state: IProductState, { product }) => ({
    ...state,
    item: product,
    loading: false,
  })),
);

export function reducerProduct(
  state: IProductState | undefined,
  // tslint:disable-next-line: no-any
  action: any,
) {
  return productReducer(state, action);
}
