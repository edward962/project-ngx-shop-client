import { createAction, props } from '@ngrx/store';
import {
  IProduct,
  IFeedback,
} from 'src/app/shared/interfaces/product.interface';

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
  props<{ err: Error }>()
);
export const createFeedbackPending = createAction(
  '[Feedback] Create feedback pending',
  props<{ feedback: IFeedback }>()
);
export const createFeedbackError = createAction(
  '[Feedback] Create feedback error',
  props<{ err: Error }>()
);
export const createFeedbackSuccess = createAction(
  '[Feedback] Create feedback success',
  props<{ rating: number; feedback: IFeedback }>()
);

export const clearProduct = createAction('[Product] Clear product');
