import { ICategory } from '@root-store/reducers/categories.reducer';
import { Action } from '@ngrx/store';
import { CategoriesService } from '@shared/services/category.service';
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

  public getCategories$: Observable<Action> = createEffect(
    (): Observable<Action> =>
      this.actions.pipe(
        ofType(getCategoriesPending),
        switchMap(
          (): Observable<Action> => {
            return this.categoriesService.getCategories().pipe(
              map(
                (categories: ICategory[]): Action => {
                  return getCategoriesSuccess({ categories });
                }
              ),
              catchError(
                (err: Error): Observable<Action> =>
                  of(getCategoriesError({ err }))
              )
            );
          }
        )
      )
  );
}
