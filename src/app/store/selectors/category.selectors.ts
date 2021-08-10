import { EntityState } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { IProductsState } from '@category-store/reducers/products.reducer';
import { IProduct } from '@product-store/reducers/product.reducer';
import { ICategoryState } from '@root-store/reducers/categories.reducer';

interface ISelectStore {
	categories: ICategoryState;
	cart: EntityState<IProduct>;
	suggestedProducts: IProductsState;
}

export const selectCategoriesLoading = (state: ISelectStore): boolean => state.categories.loading;

export const selectSuggestedProductsLoading = (state: ISelectStore): boolean =>
	state.suggestedProducts.loading;

export const loadingSuggestedProductAndCategories = createSelector(
	selectCategoriesLoading,
	selectSuggestedProductsLoading,
	(loadingCategories: boolean, loadingSuggestedProducts: boolean): boolean => {
		return !(loadingCategories && loadingSuggestedProducts);
	},
);
