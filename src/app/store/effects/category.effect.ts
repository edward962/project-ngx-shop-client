import { Action } from '@ngrx/store';
import { CategoriesService } from './../../shared/services/category.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  getCategoriesPending,
  getCategoriesSuccess,
  getCategoriesError,
} from '../actions/category.actions';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions: Actions,
    public categoriesService: CategoriesService
  ) {}
  // tslint:disable-next-line:typedef
  public getCategories$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(getCategoriesPending),
      // tslint:disable-next-line:typedef
      switchMap(() => {
        return this.categoriesService.getCategories().pipe(
          // tslint:disable-next-line:typedef
          map((categories) => {
            return getCategoriesSuccess({ categories });
          }),
          catchError(
            (err: Error): Observable<Action> => of(getCategoriesError({ err }))
          )
        );
      })
    )
  );
}
