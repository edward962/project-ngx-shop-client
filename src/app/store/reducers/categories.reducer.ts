import { createReducer, on } from '@ngrx/store';
import {
  getCategoriesPending,
  getCategoriesSuccess,
} from '../actions/category.actions';

export interface ICategoryState {
  items: ICategory[];
  loading: boolean;
}

export interface ICategory {
  _id: string;
  name: string;
  subCategories?: ISubCategory[];
}

export interface ISubCategory {
  _id: string;
  name: string;
  category: string;
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
    items: categories,
    loading: false,
  }))
);

export function reducerCategories(
  state: ICategoryState | undefined,
  // tslint:disable-next-line: no-any
  action: any
) {
  return categoriesReducer(state, action);
}
