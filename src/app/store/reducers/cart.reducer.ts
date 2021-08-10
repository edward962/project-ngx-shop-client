import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import {
	createReducer,
	on,
	createSelector,
	MemoizedSelector,
	createFeatureSelector,
	Action,
} from '@ngrx/store';
import { IProduct } from '@product-store/reducers/product.reducer';
import {
	addProductToCart,
	removeProductFromCart,
	incrementProductInCart,
	decrementProductInCart,
	addAllProductsToCart,
	removeProductsFromCartSuccess,
} from '../actions/cart.actions';

export const cartAdapter: EntityAdapter<IProduct> = createEntityAdapter({
	selectId: (product: IProduct): string => product._id,
});

const initialState: EntityState<IProduct> = cartAdapter.getInitialState({});
const cartReducer = createReducer(
	initialState,
	// eslint-disable-next-line
  on(addProductToCart, (state: EntityState<IProduct>, { product }) => {
		const entity: IProduct | undefined = state.entities[product._id];
		return cartAdapter.upsertOne(
			{
				...product,
				count: entity?.count ? entity.count + 1 : 1,
			},
			state,
		);
	}),
	// eslint-disable-next-line
  on(addAllProductsToCart, (state: EntityState<IProduct>, { products }) => {
		// eslint-disable-next-line import/no-deprecated
		return cartAdapter.addMany(products, state);
	}),
	// eslint-disable-next-line
  on(removeProductFromCart, (state: EntityState<IProduct>, { product }) => {
		return cartAdapter.removeOne(product._id, state);
	}),
	// eslint-disable-next-line
  on(removeProductsFromCartSuccess, () => {
		return initialState;
	}),
	// eslint-disable-next-line
  on(incrementProductInCart, (state: EntityState<IProduct>, { product }) => {
		return cartAdapter.updateOne(
			{
				id: product._id,
				changes: { count: product.count && product.count + 1 },
			},
			state,
		);
	}),
	// eslint-disable-next-line
  on(decrementProductInCart, (state: EntityState<IProduct>, { product }) => {
		return cartAdapter.updateOne(
			{
				id: product._id,
				changes: { count: product.count && product.count - 1 },
			},
			state,
		);
	}),
);

export function reducerCart(
	state: EntityState<IProduct> | undefined,
	action: Action,
): EntityState<IProduct> {
	return cartReducer(state, action);
}

export const selectProductsState = createFeatureSelector<EntityState<IProduct>>('cart');
export const { selectAll } = cartAdapter.getSelectors();
export const selectProducts = createSelector(selectProductsState, selectAll);

export const trueProductsCount: MemoizedSelector<
	object,
	number
	// eslint-disable-next-line
  > = createSelector(selectProducts, (products: IProduct[]) => {
	// eslint-disable-next-line
  return products.reduce((count: number, product: IProduct) => {
		const newCount = count + (product.count ?? 0);
		return newCount;
	}, 0);
});
