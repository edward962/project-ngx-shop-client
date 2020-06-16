import { CategoriesService } from './../../shared/services/category.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  getCategoriesPending,
  getCategoriesSuccess,
} from '../actions/category.actions';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions: Actions,
    public categoriesService: CategoriesService
  ) {}
  // tslint:disable-next-line: no-any
  public getCategories$: Observable<any> = createEffect(() =>
    this.actions.pipe(
      ofType(getCategoriesPending),
      switchMap(() => {
        return this.categoriesService.getCategories().pipe(
          map((categories) => {
            return getCategoriesSuccess({ categories });
          })
        );
      })
    )
  );
}
