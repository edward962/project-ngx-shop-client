import { createReducer, on, Action } from '@ngrx/store';
import {
  getSuggestedProductsPending,
  getSuggestedProductsSuccess,
  clearSuggestedProducts,
  getSuggestedProductsError,
} from '../actions/suggested-products.actions';
import { IProductsState } from 'src/app/content/category/store/reducers/products.reducer';
import { IProduct } from 'src/app/shared/interfaces/product.interface';

const initialState: IProductsState = {
  items: [],
  loading: false,
  prices: {
    min: 0,
    max: 0,
  },
};

const suggestedProductsReducer = createReducer(
  initialState,
  // tslint:disable-next-line:typedef
  on(getSuggestedProductsPending, (state: IProductsState) => ({
    ...state,
    loading: true,
  })),
  // tslint:disable-next-line:typedef
  on(getSuggestedProductsSuccess, (state: IProductsState, { products }) => ({
    ...state,
    items: products,
    loading: false,
  })),
  // tslint:disable-next-line:typedef
  on(getSuggestedProductsError, (state: IProductsState) => ({
    ...state,
    loading: false,
  })),
  // tslint:disable-next-line:typedef
  on(clearSuggestedProducts, (state: IProductsState) => initialState)
);

export function reducerSuggestedProducts(
  state: IProductsState | undefined,
  action: Action
): {
  items: IProduct[];
  loading: boolean;
} {
  return suggestedProductsReducer(state, action);
}
