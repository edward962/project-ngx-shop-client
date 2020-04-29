import { ICategory } from './../../interfaces/category.interface';
import { createReducer, on } from '@ngrx/store';
import { getCategoriesPending, getCategoriesSuccess } from '../actions/category.actions';

export interface ICategoryState {
items: ICategory[];
loading: boolean;
}

const categoriesReducer = createReducer(
  {

    items: [],
    loading: false,
  },
  on(getCategoriesPending, (state: ICategoryState) => ({
    ...state,
    loading: true,
  })),
  on(getCategoriesSuccess, (state: ICategoryState, { categories }) => ({
    ...state,
    items: [...categories],
    loading: false,
  })),
  );

export function reducer(state: ICategoryState | undefined, action: any) {
  return categoriesReducer(state, action);
}
