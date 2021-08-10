import { createReducer, on, Action } from '@ngrx/store';
import { getBrandsSuccess, getBrandsPending, getBrandsError } from '../actions/brands.actions';

export interface IBrandsState {
	items: string[];
	loading: Boolean;
}

const brandsReducer = createReducer(
	{
		items: [],
		loading: false,
	},
	// eslint-disable-next-line
  on(getBrandsPending, (state: IBrandsState, {}) => ({
		...state,
		loading: false,
	})),
	// eslint-disable-next-line
  on(getBrandsSuccess, (state: IBrandsState, { brands }) => ({
		...state,
		items: brands ?? [''],
		loading: false,
	})),
	// eslint-disable-next-line
  on(getBrandsError, (state: IBrandsState, {}) => ({
		...state,
		loading: false,
	})),
	// eslint-disable-next-line
);

export function reducerBrands(state: IBrandsState, action: Action): IBrandsState {
	return brandsReducer(state, action);
}
