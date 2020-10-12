import { IMinMaxPrice } from '@category-store/reducers/products.reducer';
import { createAction, props } from '@ngrx/store';
import { IProduct } from '@product-store/reducers/product.reducer';

export const getProductsPending = createAction(
  '[Products] Get products pending',
  props<{
    currentCategory?: string;
    priceRange?: number[];
    text?: string;
    brands?: string;
  }>()
);

export const getProductsSuccess = createAction(
  '[Products] Get products success',
  props<{ products: IProduct[]; prices: IMinMaxPrice }>()
);
export const getProductsError = createAction(
  '[Products] Get products error',
  props<{ err: Error }>()
);
