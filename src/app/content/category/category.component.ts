import { ICategory } from 'src/app/store/reducers/categories.reducer';
import { IProductsState } from 'src/app/content/category/store/reducers/products.reducer';
import { UnSubscriber } from './../../shared/utils/unsubscriber';
import { getCategoriesPending } from 'src/app/store/actions/category.actions';
import { IStore } from 'src/app/store/reducers';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { getProductsPending } from './store/actions/products.actions';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { getBrandsPending } from './store/actions/brands.actions';
import {
  debounceTime,
  takeUntil,
  switchMap,
  filter,
  take,
  pluck,
  distinctUntilChanged,
  withLatestFrom,
  distinctUntilKeyChanged,
} from 'rxjs/operators';
import { go } from 'src/app/store/actions/router.actions';
import { IBrandsState } from './store/reducers/brands.reducer';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent extends UnSubscriber implements OnInit {
  public categories$: Observable<ICategory[]> = this._store
    .select('categories', 'items')
    .pipe(
      filter((categories: ICategory[]): boolean => categories.length > 0),
      take(1)
    );
  public categoriesLoading$: Observable<boolean> = this._store
    .select('categories', 'loading')
    .pipe(takeUntil(this.unsubscribe$$));
  public subCategory!: string;
  public products$: Observable<IProductsState> = this._store
    .select('products')
    .pipe(takeUntil(this.unsubscribe$$));
  public brands$: Observable<IBrandsState> = this._store
    .select('brands')
    .pipe(takeUntil(this.unsubscribe$$));

  public category$ = this._activatedRoute.params.pipe(
    pluck('subCategory'),
    filter<string>(Boolean),
    distinctUntilChanged()
  );
  public selectedSubCatId?: string;
  public selectedBrands: string[] = [];
  public selectedPrices: number[] = [];
  public form: FormGroup = this._fb.group({
    brands: [[]],
    prices: [[]],
    searchByName: [''],
  });
  public min = 0;
  public max = 0;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _store: Store<IStore>
  ) {
    super();
  }

  public ngOnInit(): void {
    this._store.dispatch(getCategoriesPending());

    this.products$
      .pipe(pluck('prices'), distinctUntilKeyChanged('max'))
      .subscribe((prices) => {
        console.log(prices);
        this.min = prices.min;
        this.max = prices.max;
        this.form.patchValue(
          {
            // searchByName: query.searchByName ?? '',
            brands: this.selectedBrands,
            prices: this.selectedPrices,
          },
          { emitEvent: false }
        );
      });
    this.categories$
      .pipe(
        switchMap(
          (): Observable<[Params, Params]> => {
            return combineLatest([
              this._activatedRoute.params,
              this._activatedRoute.queryParams,
            ]);
          }
        )
      )
      .subscribe(([{ subCategory }, query]: [Params, Params]): void => {
        this.selectedPrices = query.prices ? query.prices.split(',') : [];
        this.selectedBrands = query.brands ? query.brands.split(',') : [];
        this.selectedSubCatId = subCategory;
        this._store.dispatch(
          getProductsPending({
            selectedBrands: query.brands,
            currentCategory: subCategory,
            searchByName: query.searchByName,
            priceRange: this.selectedPrices || '',
          })
        );
        this._store.dispatch(
          getBrandsPending({
            id: subCategory,
            prices: this.selectedPrices,
          })
        );
      });
    this.form.valueChanges
      .pipe(withLatestFrom(this.category$), takeUntil(this.unsubscribe$$))
      // tslint:disable-next-line:typedef
      .subscribe(([form, subCategory]) => {
        this._store.dispatch(
          go({
            path: ['/category', subCategory],
            query: {
              prices: form.prices[0]
                ? `${form.prices[0]},${form.prices[1]}`
                : undefined,
              brands: (this.selectedBrands as string[]).join(',') || undefined,
              searchByName: form.searchByName || undefined,
            },
          })
        );
      });
  }
  public getForm$(
    controlName: string
  ): Observable<string[] | string | number[]> {
    return (this.form.get(controlName) as FormControl).valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.unsubscribe$$)
    );
  }
}
