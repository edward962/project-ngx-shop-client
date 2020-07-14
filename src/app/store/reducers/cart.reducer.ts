import { removeProductsFromCartSuccess } from './../actions/cart.actions';
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
import { IProduct } from 'src/app/shared/interfaces/product.interface';

export const cartAdapter: EntityAdapter<IProduct> = createEntityAdapter({
  selectId: (product: IProduct): string => product._id,
});

const initialState: EntityState<IProduct> = cartAdapter.getInitialState({});
const cartReducer = createReducer(
  initialState,
  // tslint:disable-next-line:typedef
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
  // tslint:disable-next-line:typedef
  on(addAllProductsToCart, (state: EntityState<IProduct>, { products }) => {
    // tslint:disable-next-line: deprecation
    return cartAdapter.addAll(products, state);
  }),
  // tslint:disable-next-line:typedef
  on(removeProductFromCart, (state: EntityState<IProduct>, { product }) => {
    return cartAdapter.removeOne(product._id, state);
  }),
  // tslint:disable-next-line:typedef
  on(removeProductsFromCartSuccess, () => {
    return initialState;
  }),
  // tslint:disable-next-line:typedef
  on(incrementProductInCart, (state: EntityState<IProduct>, { product }) => {
    return cartAdapter.updateOne(
      {
        id: product._id,
        changes: { count: product.count && product.count + 1 },
      },
      state
    );
  }),
  // tslint:disable-next-line:typedef
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
): EntityState<IProduct> {
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
  // tslint:disable-next-line:typedef
> = createSelector(selectProducts, (products: IProduct[]) => {
  // tslint:disable-next-line:typedef
  return products.reduce((count: number, product: IProduct) => {
    return (count += product.count ?? 0);
  }, 0);
});
