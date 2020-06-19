import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import {
  addProductToCart,
  removeProductFromCart,
  incrementProductInCart,
  decrementProductInCart,
  addAllProductsToCart,
} from '../actions/cart.actions';
import {
  createReducer,
  on,
  createSelector,
  MemoizedSelector,
  createFeatureSelector,
  Action,
} from '@ngrx/store';
import { IProduct } from 'src/app/shared/interfaces/product.inteface';

export const cartAdapter: EntityAdapter<IProduct> = createEntityAdapter({
  selectId: (product: IProduct) => product._id,
});

const initialState: EntityState<IProduct> = cartAdapter.getInitialState({});
const cartReducer = createReducer(
  initialState,
  on(addProductToCart, (state: EntityState<IProduct>, { product }) => {
    const entity: IProduct | undefined = state.entities[product._id];
    return cartAdapter.upsertOne(
      {
        ...product,
        count: entity?.count ? entity.count + 1 : 1,
      },
      state
    );
  }),
  on(addAllProductsToCart, (state: EntityState<IProduct>, { products }) => {
    return cartAdapter.addAll(products, state);
  }),
  on(removeProductFromCart, (state: EntityState<IProduct>, { product }) => {
    return cartAdapter.removeOne(product._id, state);
  }),
  on(incrementProductInCart, (state: EntityState<IProduct>, { product }) => {
    return cartAdapter.updateOne(
      {
        id: product._id,
        changes: { count: product.count && product.count + 1 },
      },
      state
    );
  }),
  on(decrementProductInCart, (state: EntityState<IProduct>, { product }) => {
    return cartAdapter.updateOne(
      {
        id: product._id,
        changes: { count: product.count && product.count - 1 },
      },
      state
    );
  })
);

export function reducerCart(
  state: EntityState<IProduct> | undefined,
  action: Action
) {
  return cartReducer(state, action);
}

export const selectProductsState = createFeatureSelector<EntityState<IProduct>>(
  'cart'
);
export const { selectAll } = cartAdapter.getSelectors();
export const selectProducts = createSelector(selectProductsState, selectAll);

export const trueProductsCount: MemoizedSelector<
  object,
  number
> = createSelector(selectProducts, (products: IProduct[]) => {
  return products.reduce((count: number, product: IProduct) => {
    return (count += product.count ?? 0);
  }, 0);
});
