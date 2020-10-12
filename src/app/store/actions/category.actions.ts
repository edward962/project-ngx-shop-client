import { createAction, props } from '@ngrx/store';
import { ICategory } from '@root-store/reducers/categories.reducer';

export const getCategoriesPending = createAction(
  '[Categories] Get categories pending'
);

export const getCategoriesSuccess = createAction(
  '[Categories] Get categories success',
  props<{ categories: ICategory[] }>()
);
export const getCategoriesError = createAction(
  '[Categories] Get categories error',
  props<{ err: Error }>()
);
