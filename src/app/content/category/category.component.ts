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
  public selectedPrices: number[] = [];
  public categories$: Observable<ICategoryState> = this._store.select(
    'categories'
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
    // tslint:disable-next-line:typedef
    map((query: Params) => ({
      ...query,
      brands: query.brands ? query.brands.split(',') : [],
      prices: query.prices ? query.prices.split(',') : '',
    })),
    tap(this._setFilters.bind(this)),
    pluck('brands'),
    takeUntil(this.unsubscribe$$)
  );

  public form: FormGroup = this._fb.group({
    brands: [[]],
    searchByName: [''],
    prices: [[0, 2000]],
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
        prices: [0, 2000],
      })
    );
  }

  private _getProducts([subCategory, query]: [string, Params]): void {
    this.selectedPrices = query.prices ? query.prices.split(',') : '';
    this._store.dispatch(
      getProductsPending({
        selectedBrands: query.brands,
        currentCategory: subCategory,
        searchByName: query.searchByName,
        priceRange: query.prices,
      })
    );
  }

  private _setFilters(query: Params): void {
    this.form.setValue(
      {
        searchByName: query.searchByName ?? '',
        brands: query.brands ?? '',
        prices: query.prices ?? undefined,
      },
      { emitEvent: false }
    );
  }

  private _navigateToProductsByFilter([form, subCategory]: [
    {
      brands: string[];
      searchByName: string[];
      prices: number[];
    },
    string
  ]): void {
    this._store.dispatch(
      go({
        path: ['/category', subCategory],
        query: {
          brands: (form?.brands as string[]).join(',') || undefined,
          searchByName: form.searchByName || undefined,
          prices:
            (form.prices && (form.prices as number[]).join(',')) || undefined,
        },
      })
    );
  }
}
