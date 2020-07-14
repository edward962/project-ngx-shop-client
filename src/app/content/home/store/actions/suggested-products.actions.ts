import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/shared/interfaces/product.interface';

export const getSuggestedProductsPending = createAction(
  '[Home] Get suggested products pending'
);
export const getSuggestedProductsSuccess = createAction(
  '[Home] Get suggested products success',
  props<{ products: IProduct[] }>()
);
export const clearSuggestedProducts = createAction(
  '[Home] Clear Suggested Products'
);
export const getSuggestedProductsError = createAction(
  '[Home] Get suggested products success',
  props<{ err: Error }>()
);
