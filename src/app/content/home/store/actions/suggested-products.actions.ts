import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/shared/interfaces/product.inteface';

export const getSuggestedProductsPending = createAction(
  '[Home] Get suggested products pending'
);
export const getSuggestedProductsSuccess = createAction(
  '[Home] Get suggested products success',
  props<{ products: IProduct[] }>()
);
