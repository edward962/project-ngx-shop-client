import { createAction, props } from '@ngrx/store';
import { IPriceData } from '../../category.component';

export const getBrandsPending = createAction(
  '[Brands] Get brands pending',
  props<{
    id?: string;
    priceRange?: IPriceData;
  }>()
);
export const getBrandsSuccess = createAction(
  '[Brands] Get brands success',
  props<{
    brands?: string[];
  }>()
);

export const getBrandsFail = createAction('[Brands] Get brands fail');
