import { createAction, props } from '@ngrx/store';
import { IProduct, IFeedback } from '../reducers/product.reducer';

export const getProductPending = createAction(
  '[Product] Get product pending',
  props<{ id: string }>(),
);
export const getProductSuccess = createAction(
  '[Product] Get product success',
  props<{ product: IProduct }>(),
);

export const createFeedbackPending = createAction(
  '[Feedback] Create feedback pending',
  props<{ feedback: IFeedback }>(),
);
export const createFeedbackSuccess = createAction(
  '[Feedback] Create feedback success',
);

export const clearProduct = createAction('[Product] Clear product');