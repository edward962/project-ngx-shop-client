import { ICategoryState } from './../../../../store/reducers/categories.reducer';
import { EntityState } from '@ngrx/entity';
import { IProductsState } from './../../../category/store/reducers/products.reducer';
import { createSelector } from '@ngrx/store';

export const selectCategoriesLoading = (state: {
    categories: ICategoryState;
    cart: EntityState<any>;
    products: IProductsState;

}): boolean => state.categories.loading;

export const selectProductsLoading = (state: {
    categories: ICategoryState;
    cart: EntityState<any>;
    products: IProductsState
}): boolean => state.products.loading;

export const loadingSugestedProductAndCategories = createSelector(
    selectCategoriesLoading,
    selectProductsLoading,
    (loadingCategories: boolean, loadingProducts: boolean): boolean => {
        return !(loadingCategories && loadingProducts);
    });
