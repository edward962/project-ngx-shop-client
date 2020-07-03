import { EntityState } from '@ngrx/entity';
import { ICategoryState } from './../reducers/categories.reducer';
import { createSelector } from '@ngrx/store';
import { ISuggestedProductsState } from 'src/app/content/home/store/reducers/suggested-products.reducer';

export const selectCategoriesLoading = (state: {
    categories: ICategoryState;
    cart: EntityState<any>;
    suggestedProducts: ISuggestedProductsState
}): boolean => state.categories.loading;

export const selectSuggestedProductsLoading = (state: {
    categories: ICategoryState;
    cart: EntityState<any>;
    suggestedProducts: ISuggestedProductsState
}): boolean => state.suggestedProducts.loading;

export const loadingSugestedProductAndCategories = createSelector(
    selectCategoriesLoading,
    selectSuggestedProductsLoading,
    (loadingCategories: boolean, loadingSuggestedProducts: boolean): boolean => {
        return !(loadingCategories && loadingSuggestedProducts);
    });
