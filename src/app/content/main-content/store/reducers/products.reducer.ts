import { createReducer, on } from '@ngrx/store';
import {
  getProductsPending,
  getProductsSuccess,
  getProductsError,
  getProductPending,
  getProductSuccess,
  getProductsPagingSuccess,
  removeFromStateProducts,
  clearProduct,
} from '../actions/products.actions';

export interface IProductState {
  item: IProduct;
  items: IProduct[];
  loading: boolean;
}

export interface IFeedback {
  rate: number;
  advantages: string;
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
  name?: string;
  description?: string;
  feedbacks?: IFeedback;
  price?: number;
  status?: boolean;
  images?: IProductImage[] | undefined;
  rating?: number | undefined;
  idSubCat?: string ;
}

const productsReducer = createReducer(
  {
    item: { _id: '' },
    items: [],
    loading: false,
  
  },
  on(getProductsPending, (state: IProductState) => ({
    ...state,
    loading: true,
  })),
  on(getProductsSuccess, (state: IProductState, { products }) => ({
    ...state,
    items: [...products],
    loading: false,
  })),
  on(getProductsPagingSuccess, (state: IProductState, { products }) => ({
    ...state,
    items: [...state.items, ...products],
    loading: false,
  })),
  // tslint:disable-next-line: variable-name
  on(removeFromStateProducts, (state: IProductState, _action) => {
    return ({
      ...state,
      items: [],
      loading: false,
    });
  }),
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
  on(clearProduct, (state: IProductState) => ({
    ...state,
    loading: false,
    item: { _id: '' },
  }))
);

export function reducer(state: IProductState | undefined, action: any) {
  return productsReducer(state, action);
}
