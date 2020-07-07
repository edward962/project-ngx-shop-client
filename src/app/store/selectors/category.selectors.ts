import { EntityState } from '@ngrx/entity';
import { ICategoryState } from './../reducers/categories.reducer';
import { createSelector } from '@ngrx/store';
import { IProductsState } from 'src/app/content/category/store/reducers/products.reducer';
import { IProduct } from 'src/app/shared/interfaces/product.inteface';

export const selectCategoriesLoading = (state: {
  categories: ICategoryState;
  cart: EntityState<IProduct>;
  suggestedProducts: IProductsState;
}): boolean => state.categories.loading;

export const selectSuggestedProductsLoading = (state: {
  categories: ICategoryState;
  cart: EntityState<IProduct>;
  suggestedProducts: IProductsState;
}): boolean => state.suggestedProducts.loading;

export const loadingSugestedProductAndCategories = createSelector(
  selectCategoriesLoading,
  selectSuggestedProductsLoading,
  (loadingCategories: boolean, loadingSuggestedProducts: boolean): boolean => {
    return !(loadingCategories && loadingSuggestedProducts);
  }
);
