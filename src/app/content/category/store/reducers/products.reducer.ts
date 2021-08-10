import { IProduct } from '@product-store/reducers/product.reducer';
import { createReducer, on, Action } from '@ngrx/store';
import {
	getProductsPending,
	getProductsSuccess,
	getProductsError,
} from '../actions/products.actions';

export interface IProductsState {
	items: IProduct[];
	loading: boolean;
	prices: IMinMaxPrice;
}

export interface IProductApi {
	items: IProduct[];
	prices: IMinMaxPrice;
}
export interface IMinMaxPrice {
	min: number;
	max: number;
}

const productsReducer = createReducer(
	{
		items: [],
		loading: false,
		prices: { min: 0, max: 0 },
	},
	// eslint-disable-next-line
  on(getProductsPending, (state: IProductsState) => ({
		...state,
		loading: true,
	})),
	// eslint-disable-next-line
  on(getProductsSuccess, (state: IProductsState, { products, prices }) => ({
		...state,
		items: products,
		prices,
		loading: false,
	})),
	// eslint-disable-next-line
  on(getProductsError, (state: IProductsState) => ({
		...state,
		loading: false,
	})),
);

export function reducerProducts(
	state: IProductsState | undefined,
	action: Action,
): {
	items: IProduct[];
	loading: boolean;
} {
	return productsReducer(state, action);
}
