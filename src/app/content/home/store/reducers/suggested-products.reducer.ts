import { createReducer, on, Action } from '@ngrx/store';
import { IProduct } from 'src/app/content/category/content/product/store/reducers/product.reducer';
import { getSuggestedProductsPending, getSuggestedProductsSuccess } from '../actions/suggested-products.actions';
import { IProductsState } from 'src/app/content/category/store/reducers/products.reducer';

export interface ISuggestedProductsState {
  items: IProduct[];
  loading:boolean
}

const initialState : ISuggestedProductsState = {
  items: [],
  loading: false,
}


const suggestedProductsReducer = createReducer(
  initialState,
  on(getSuggestedProductsPending, (state: IProductsState) => ({
    ...state,
    loading: true,
  })),
  on(getSuggestedProductsSuccess, (state: IProductsState,  { products } ) => ({
    ...state,
    items:products,
    loading: false,
  })),
);

export function reducerSuggestedProducts(
  state: IProductsState | undefined,
  action: Action,
) {
  return suggestedProductsReducer(state, action);
}
