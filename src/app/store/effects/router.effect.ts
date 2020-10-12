import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { forward, go } from '../actions/router.actions';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class RouterEffects {
  public go = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(go),

        tap(({ path, query: queryParams, extras }): void => {
          this.router.navigate(path, {
            queryParams,
            ...extras,
          });
        })
      ),
    { dispatch: false }
  );

  public forward = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(forward),

        tap((): void => {
          this.location.forward();
        })
      )
  );

  public back = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(forward),

        tap((): void => {
          this.location.back();
        })
      )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}
}
