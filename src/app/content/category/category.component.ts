import { ICategoryState } from 'src/app/store/reducers/categories.reducer';
import { IProductsState } from 'src/app/content/category/store/reducers/products.reducer';
import { UnSubscriber } from './../../shared/utils/unsubscriber';
import { getCategoriesPending } from 'src/app/store/actions/category.actions';
import { IStore } from 'src/app/store/reducers';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { getProductsPending } from './store/actions/products.actions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { getBrandsPending } from './store/actions/brands.actions';
import {
  takeUntil,
  filter,
  take,
  pluck,
  distinctUntilChanged,
  withLatestFrom,
  tap,
  map,
} from 'rxjs/operators';
import { go } from 'src/app/store/actions/router.actions';
import { IBrandsState } from './store/reducers/brands.reducer';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent extends UnSubscriber implements OnInit {
  public categories$: Observable<ICategoryState> = this._store
    .select('categories')
    .pipe(
      filter(({ items }): boolean => items.length > 0),
      take(1)
    );

  public products$: Observable<IProductsState> = this._store
    .select('products')
    .pipe(takeUntil(this.unsubscribe$$));

  public brands$: Observable<IBrandsState> = this._store
    .select('brands')
    .pipe(takeUntil(this.unsubscribe$$));

  public subCategory$ = this._activatedRoute.params.pipe(
    pluck('subCategory'),
    filter<string>(Boolean),
    distinctUntilChanged(),
    takeUntil(this.unsubscribe$$)
  );

  public selectedBrands$: Observable<string[]> = combineLatest([
    this.subCategory$.pipe(tap(this._getBrands.bind(this))),
    this._activatedRoute.queryParams,
  ]).pipe(
    tap(this._getProducts.bind(this)),
    pluck(1),
    map((query: Params) => ({
      ...query,
      brands: query.brands ? query.brands.split(',') : [],
    })),
    tap(this._setFilters.bind(this)),
    pluck('brands'),
    takeUntil(this.unsubscribe$$)
  );

  public form: FormGroup = this._fb.group({
    brands: [[]],
    searchByName: [''],
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _store: Store<IStore>
  ) {
    super();
  }

  public ngOnInit(): void {
    this._store.dispatch(getCategoriesPending());
    this.form.valueChanges
      .pipe(withLatestFrom(this.subCategory$), takeUntil(this.unsubscribe$$))
      .subscribe(this._navigateToProductsByFilter.bind(this));
  }

  private _getBrands(subCategory: string): void {
    this._store.dispatch(
      getBrandsPending({
        id: subCategory,
        prices: [0, 10000], //TODO  do i need this for brands
      })
    );
  }

  private _getProducts([subCategory, query]: [string, Params]): void {
    this._store.dispatch(
      getProductsPending({
        selectedBrands: query.brands,
        currentCategory: subCategory,
        searchByName: query.searchByName,
      })
    );
  }

  private _setFilters(query: Params): void {
    this.form.setValue(
      {
        searchByName: query.searchByName ?? '',
        brands: query.brands,
      },
      { emitEvent: false }
    );
  }

  private _navigateToProductsByFilter([form, subCategory]: [
    any,
    string
  ]): void {
    this._store.dispatch(
      go({
        path: ['/category', subCategory],
        query: {
          brands: (form.brands as string[]).join(',') || undefined,
          searchByName: form.searchByName || undefined,
        },
      })
    );
  }
}
