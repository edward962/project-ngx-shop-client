import { CategoriesService } from './../../shared/services/category.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { getCategoriesPending, getCategoriesSuccess } from '../actions/category.actions';
import { switchMap, map } from 'rxjs/operators';
import { ProductsService } from 'src/app/shared/services/products.service';

@Injectable()
export class CategoryEffects {
    productsService?: ProductsService;
  constructor(
    private actions: Actions,
    public categoriesService: CategoriesService
  ) {}
    public getCategories$: Observable<any> = createEffect(() =>
    this.actions.pipe(
        ofType(getCategoriesPending),
        switchMap(() => {
        return this.categoriesService.getCategories().pipe(
            map(categories => {
              return getCategoriesSuccess({ categories });
            }),
        );
      }),
    ),
  );
}
