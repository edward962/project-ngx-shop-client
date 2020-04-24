import { IProduct } from 'src/app/interfaces/product.interface';
import { createAction, props } from '@ngrx/store';
import { ICartProduct } from '../reducers/cart.reducer';

export const addProductToCart = createAction(
  '[Product] Add product to cart',
  props<{ product: IProduct }>()
);

export const removeProductFromCart = createAction(
  '[Product] Remove product from cart',
  props<{ product: ICartProduct }>()
);
export const incrementProductInCart = createAction(
  '[Product] Increment product in cart',
  props<{ product: ICartProduct }>()
);
export const setCountProductInCart = createAction(
  '[Product] Set count product in cart',
  props<{ product: ICartProduct }>()
);

export const decrementProductInCart = createAction(
  '[Products] Decrement product in cart',
  props<{ product: ICartProduct }>()
);

export const addAllProductsToCart = createAction(
  '[Product] Add all products to cart',
  props<{ products: ICartProduct[] }>()
);
