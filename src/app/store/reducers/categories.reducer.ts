import { ICategory } from './../../interfaces/category.interface';
import { createReducer, on } from '@ngrx/store';
import { getCategoriesPending, getCategoriesSuccess } from '../actions/category.actions';
// import { IProductState } from 'src/app/content/main-content/store/reducers/products.reducer';
// import { ICartProduct } from './cart.reducer';
// import { EntityState } from '@ngrx/entity';
// import { routerReducer } from '@ngrx/router-store';

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
    items: categories,
    loading: false,
  })),
  );

export  function reducerCategories(
  state: ICategoryState | undefined,
  action: any
  ) {
  return categoriesReducer(state, action);
}
