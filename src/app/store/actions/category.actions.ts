import { ICategory } from './../../interfaces/category.interface';
import { createAction, props } from '@ngrx/store';
// import { ISubCategory } from 'src/app/interfaces/category.interface';

export const getCategoriesPending = createAction(
  '[Categories] Get categories pending'
);

export const getCategoriesSuccess = createAction(
  '[Categories] Get categories success',
  props<{ categories: ICategory[] }>(),
);

export const getCategoriesError = createAction(
    '[Categories] Get categories error',
  );
// export const getProductsPagingSuccess = createAction(
//   '[Products] Get products paging success',
//   props<{ products: IProduct[] }>(),
// );
// export const removeFromStateProducts = createAction(
//   '[Products] Remove products from state',
// );
// export const getProductsError = createAction('[Products] Get products error');

// export const getProductPending = createAction(
//   '[Product] Get product pending',
//   props<{ id: string }>(),
// );
// export const getProductSuccess = createAction(
//   '[Product] Get product success',
//   props<{ product: IProduct }>(),
// );

// export const createFeedbackPending = createAction(
//   '[Feedback] Create feedback pending',
//   props<{ feedback: IFeedback }>(),
// );
// export const createFeedbackSuccess = createAction(
//   '[Feedback] Create feedback success',
// );
