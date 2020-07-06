import { createAction, props } from '@ngrx/store';
import {
  IProduct,
  IFeedback,
} from 'src/app/shared/interfaces/product.inteface';

export const getProductPending = createAction(
  '[Product] Get product pending',
  props<{ id: string }>()
);
export const getProductSuccess = createAction(
  '[Product] Get product success',
  props<{ product: IProduct }>()
);
export const getProductError = createAction(
  '[Product] Get product error',
);
export const createFeedbackPending = createAction(
  '[Feedback] Create feedback pending',
  props<{ feedback: IFeedback }>()
);
export const createFeedbackSuccess = createAction(
  '[Feedback] Create feedback success'
);

export const clearProduct = createAction('[Product] Clear product');

