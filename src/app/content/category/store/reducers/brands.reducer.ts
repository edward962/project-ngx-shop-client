import { createReducer, on, Action } from '@ngrx/store';
import {
  getBrandsSuccess,
  getBrandsPending,
  getBrandsError,
} from '../actions/brands.actions';

export interface IBrandsState {
  items: string[];
  loading: Boolean;
}

const brandsReducer = createReducer(
  {
    items: [],
    loading: false,
  },
  // tslint:disable-next-line: typedef
  on(getBrandsPending, (state: IBrandsState, {}) => ({
    ...state,
    loading: false,
  })),
  // tslint:disable-next-line:typedef
  on(getBrandsSuccess, (state: IBrandsState, { brands }) => ({
    ...state,
    items: brands ?? [''],
    loading: false,
  })),
  // tslint:disable-next-line: typedef
  on(getBrandsError, (state: IBrandsState, {}) => ({
    ...state,
    loading: false,
  }))
  // tslint:disable-next-line:typedef
);

export function reducerBrands(
  state: IBrandsState,
  action: Action
): IBrandsState {
  return brandsReducer(state, action);
}
