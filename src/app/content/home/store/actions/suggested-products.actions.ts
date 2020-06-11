import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/content/category/content/product/store/reducers/product.reducer';


export const getSuggestedProductsPending = createAction(
  '[Products] Get suggested products pending',
  props<{}>(),
);
export const getSuggestedProductsSuccess = createAction(
  '[Products] Get suggested products success',
  props<{ products: IProduct[] }>(),
);