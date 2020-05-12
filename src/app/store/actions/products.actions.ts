import { createAction, props } from '@ngrx/store';
import { IProduct } from '../reducers/products.reducer';
import { IPriceData } from 'src/app/content/category/category.component';

export const getProductsPending = createAction(
  '[Products] Get products pending',
  props<{
    id: string,
    priceRange: IPriceData,
    productName: string,
    selectedBrands: string,
  }>(),
);

export const getProductsSuccess = createAction(
  '[Products] Get products success',
  props<{ products: IProduct[] }>(),
);
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
  // tslint:disable-next-line: no-any
  props<{ feedback: any }>(),
);
export const createFeedbackSuccess = createAction(
  '[Feedback] Create feedback success',
);
