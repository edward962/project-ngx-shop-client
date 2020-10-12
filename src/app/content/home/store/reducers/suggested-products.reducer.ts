import { IProductsState } from '@category-store/reducers/products.reducer';
import { createReducer, on, Action } from '@ngrx/store';
import { IProduct } from '@product-store/reducers/product.reducer';
import {
  getSuggestedProductsPending,
  getSuggestedProductsSuccess,
  clearSuggestedProducts,
  getSuggestedProductsError,
} from '../actions/suggested-products.actions';

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
  on(clearSuggestedProducts, () => initialState)
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
