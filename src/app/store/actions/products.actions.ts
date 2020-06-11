import { createAction, props } from '@ngrx/store';
import { IPriceData } from 'src/app/content/category/category.component';
import { IProduct } from 'src/app/content/category/content/product/store/reducers/product.reducer';

export const getProductsPending = createAction(
  '[Products] Get products pending',
  props<{
    id?: string,
    priceRange?: IPriceData,
    productName?: string,
    selectedBrands?: string,
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
export const getSuggestedProductsPending = createAction(
  '[Products] Get suggested products pending',
  props<{}>(),
);
export const getSuggestedProductsSuccess = createAction(
  '[Products] Get suggested products success',
  props<{ products: IProduct[] }>(),
);

