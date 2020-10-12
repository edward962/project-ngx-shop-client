import { createReducer, on, Action } from '@ngrx/store';
import {
  getCategoriesError,
  getCategoriesPending,
  getCategoriesSuccess,
} from '@root-store/actions/category.actions';

export interface ICategoryState {
  items: ICategory[];
  loading: boolean;
}

export interface ICategory {
  _id: string;
  name: string;
  subCategories: ISubCategory[];
}

export interface ISubCategory {
  _id: string;
  name: string;
  subCategory: string;
}

const initialState = {
  items: [],
  loading: false,
};
const categoriesReducer = createReducer(
  initialState,
  // tslint:disable-next-line:typedef
  on(getCategoriesPending, (state: ICategoryState) => ({
    ...state,
    loading: true,
  })),
  // tslint:disable-next-line:typedef
  on(getCategoriesSuccess, (state: ICategoryState, { categories }) => ({
    ...state,
    items: categories,
    loading: false,
  })),
  // tslint:disable-next-line:typedef
  on(getCategoriesError, (state: ICategoryState) => ({
    ...state,
    loading: false,
  }))
);

export function reducerCategories(
  state: ICategoryState | undefined,
  action: Action
): ICategoryState {
  return categoriesReducer(state, action);
}
