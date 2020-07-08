import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/shared/interfaces/product.inteface';

export const addProductToCart = createAction(
  '[Product] Add product to cart',
  props<{ product: IProduct }>()
);

export const removeProductFromCart = createAction(
  '[Product] Remove product from cart',
  props<{ product: IProduct }>()
);
export const removeProductFromCartError = createAction(
  '[Product] Remove product from cart error',
  props<{ err: Error }>()
);
export const incrementProductInCart = createAction(
  '[Product] Increment product in cart',
  props<{ product: IProduct }>()
);

export const decrementProductInCart = createAction(
  '[Products] Decrement product in cart',
  props<{ product: IProduct }>()
);

export const addAllProductsToCart = createAction(
  '[Product] Add all products to cart',
  props<{ products: IProduct[] }>()
);

export const cartSuccess = createAction('[Product] Cart success');
export const clearCart = createAction('[Product] Clear cart');
