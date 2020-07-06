import { createReducer, on, Action } from '@ngrx/store';
import {
  getProductPending,
  getProductSuccess,
  clearProduct,
  createFeedbackSuccess,
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

const initialState: IProductState = {
  item: {
    _id: '',
    description: '',
    feedbacksCount: 0,
    name: '',
    price: 0,
    images: [],
    feedbacks: [],
    status: false,
    rating: 0,
  },
  loading: false,
};
const productReducer = createReducer(
  initialState,
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
  })),
  // tslint:disable-next-line:typedef
  on(createFeedbackSuccess, (state: IProductState, { rating, feedback }) => ({
    ...state,
    item: {
      ...state.item,
      rating,
      feedbacksCount: state.item.feedbacksCount + 1,
      feedbacks: [...state.item.feedbacks, feedback],
    },
    loading: false,
  })),
  on(clearProduct, (state: IProductState) => initialState)
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
