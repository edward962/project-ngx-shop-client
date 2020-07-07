import { createAction, props } from '@ngrx/store';

export const getBrandsPending = createAction(
  '[Brands] Get brands pending',
  props<{
    id: string;
    prices: number[];
  }>()
);
export const getBrandsSuccess = createAction(
  '[Brands] Get brands success',
  props<{
    brands: string[];
  }>()
);
