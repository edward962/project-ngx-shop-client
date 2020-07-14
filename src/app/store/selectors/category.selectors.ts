import { EntityState } from '@ngrx/entity';
import { ICategoryState } from './../reducers/categories.reducer';
import { createSelector } from '@ngrx/store';
import { IProductsState } from 'src/app/content/category/store/reducers/products.reducer';
import { IProduct } from 'src/app/shared/interfaces/product.interface';

interface ISelectStore {
  categories: ICategoryState;
  cart: EntityState<IProduct>;
  suggestedProducts: IProductsState;
}

export const selectCategoriesLoading = (state: ISelectStore): boolean =>
  state.categories.loading;

export const selectSuggestedProductsLoading = (state: ISelectStore): boolean =>
  state.suggestedProducts.loading;

export const loadingSuggestedProductAndCategories = createSelector(
  selectCategoriesLoading,
  selectSuggestedProductsLoading,
  (loadingCategories: boolean, loadingSuggestedProducts: boolean): boolean => {
    return !(loadingCategories && loadingSuggestedProducts);
  }
);
