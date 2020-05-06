import { IPriceData } from './../../interfaces/product.interface';
import { createAction, props } from '@ngrx/store';
import { IProduct, IFeedback } from '../reducers/products.reducer';

export const getProductsPending = createAction(
  '[Products] Get products pending',
  props<{
    id: string,
    priceRange: IPriceData,
    productName: string,
    selectedBrands: string
  }>(),
);

export const getProductsSuccess = createAction(
  '[Products] Get products success',
  props<{ products: IProduct[] }>(),
);
export const getProductsPagingSuccess = createAction(
  '[Products] Get products paging success',
  props<{ products: IProduct[] }>(),
);
export const removeFromStateProducts = createAction(
  '[Products] Remove products from state',
);
export const getProductsError = createAction('[Products] Get products error');

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
  props<{ feedback: any }>(),
);
export const createFeedbackSuccess = createAction(
  '[Feedback] Create feedback success',
);
