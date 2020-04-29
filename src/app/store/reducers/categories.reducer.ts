import { ICategory } from './../../interfaces/category.interface';
import { createReducer, on } from '@ngrx/store';
import {
  getProductsPending,
  getProductsSuccess,
  getProductsError,
  getProductPending,
  getProductSuccess,
  getProductsPagingSuccess,
  removeFromStateProducts,
} from '../actions/products.actions';
import { getCategoriesPending, getCategoriesSuccess } from '../actions/category.actions';

export interface ICategoryState {
category: ICategory;
items: ICategory[];
loading: boolean;
}

// export interface IFeedback {
//   rate: number;
//   advantages: string;
//   limitations: string;
//   description: string;
// }
// export interface ISearch {
//   text: string;
//   subcategory: string;
// }
// export interface IProductImage {
//   url: string;
//   source: string;
// }

// export interface IProduct {
//   _id: string;
//   name: string;
//   description: string;
//   feedbacks?: IFeedback;
//   price: number;
//   status: boolean;
//   images?: IProductImage[] | undefined;
//   rating?: number | undefined;
// }

const categoriesReducer = createReducer(
  {
    category: null,
    items: null,
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
//   on(getProductsPagingSuccess, (state: IProductState, { products }) => ({
//     ...state,
//     items: [...state.items, ...products],
//     loading: false,
//   })),
//   on(removeFromStateProducts, (state: IProductState, _action) => ({
//     ...state,
//     items: [],
//     loading: false,
//   })),
//   on(getProductPending, (state: IProductState) => ({
//     ...state,
//     loading: true,
//   })),
//   on(getProductSuccess, (state: IProductState, { product }) => ({
//     ...state,
//     item: product,
//     loading: false,
//   })),
//   on(getProductsError, (state: IProductState) => ({
//     ...state,
//     loading: true,
//   })),
);

export function reducer(state: ICategoryState | undefined, action: any) {
  return categoriesReducer(state, action);
}
