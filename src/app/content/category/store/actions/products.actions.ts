import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { IMinMaxPrice } from '../reducers/products.reducer';

export const getProductsPending = createAction(
  '[Products] Get products pending',
  props<{
    currentCategory?: string;
    priceRange?: number[];
    searchByName?: string;
    selectedBrands?: string;
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
