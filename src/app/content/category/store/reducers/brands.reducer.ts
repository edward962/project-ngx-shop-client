import { createReducer, on, Action } from '@ngrx/store';
import { getBrandsSuccess } from '../actions/brands.actions';

export interface IBrandsState {
  items: string[];
  loading: Boolean;
}
export interface IBrand {
  brand: String;
}

const brandsReducer = createReducer(
  {
    items: [],
    loading: false,
  },

  // tslint:disable-next-line:typedef
  on(getBrandsSuccess, (state: IBrandsState, { brands }) => ({
    ...state,
    items: brands ?? [''],
    loading: false,
  }))
);

export function reducerBrands(state: IBrandsState | undefined, action: Action): IBrandsState {
  return brandsReducer(state, action);
}
