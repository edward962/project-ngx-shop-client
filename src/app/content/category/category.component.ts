import { UnSubscriber } from './../../shared/utils/unsubscriber';
import { IProduct } from 'src/app/content/category/content/product/store/reducers/product.reducer';
import { getCategoriesPending } from 'src/app/store/actions/category.actions';
import { IStore } from 'src/app/store/reducers';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { ICategory } from 'src/app/store/reducers/categories.reducer';
import { getProductsPending } from './store/actions/products.actions';
import { FormGroup, FormBuilder, FormControl, Form } from '@angular/forms';
import { getBrandsPending } from './store/actions/brands.actions';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { go } from 'src/app/store/actions/router.actions';

export interface IPriceData {
  value: number;
  highValue: number;
}

export interface IProductQuery {
  id?: string;
  name?: string;
  value?: string;
  highValue?: string;
  productName?: string;
  brandsQuery?: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent extends UnSubscriber implements OnInit {
  public categories$: Observable<ICategory[]> = this._store
    .select('categories', 'items')
    .pipe(takeUntil(this.unsubscribe$$));
  public show: string | undefined;
  public products$: Observable<IProduct[]> = this._store
    .select('products', 'items')
    .pipe(takeUntil(this.unsubscribe$$));
  public brands$: Observable<string[]> = this._store
    .select('brands', 'items')
    .pipe(takeUntil(this.unsubscribe$$));
  public priceRange?: number[];
  public productName = '';
  public selectedBrands: string[] = [];
  public selectedPrices: number[] = [];
  public form: FormGroup = this._fb.group({
    brands: [[]],
    prices: [{}],
    currentSubCategory: [''],
    searchByName: [''],
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _store: Store<IStore>
  ) {
    super();
  }

  public ngOnInit() {
    this._store.dispatch(getCategoriesPending());
    (this.form.get('currentSubCategory') as FormControl).valueChanges
      .pipe(debounceTime(300), takeUntil(this.unsubscribe$$))
      .subscribe((currentSubCategory) => {
        this.selectedBrands = [];
        this._store.dispatch(
          go({
            path: ['/category'],
            query: {
              subCatId: currentSubCategory,
            },
            extras: { replaceUrl: true },
          })
        );
      });
    (this.form.get('brands') as FormControl).valueChanges
      .pipe(debounceTime(300), takeUntil(this.unsubscribe$$))
      .subscribe((brands) =>
        this._store.dispatch(
          go({
            path: ['/category'],
            query: {
              brands: brands.join(',') || undefined,
            },
            extras: { queryParamsHandling: 'merge' },
          })
        )
      );
    (this.form.get('prices') as FormControl).valueChanges
      .pipe(debounceTime(300), takeUntil(this.unsubscribe$$))
      .subscribe((prices) => {
        this._store.dispatch(
          go({
            path: ['/category'],
            query: { prices: `${prices[0]},${prices[1]}` },
            extras: { queryParamsHandling: 'merge' },
          })
        );
      });
    (this.form.get('searchByName') as FormControl).valueChanges
      .pipe(debounceTime(300), takeUntil(this.unsubscribe$$))
      .subscribe((searchByName) =>
        this._store.dispatch(
          go({
            path: ['/category'],
            query: { searchByName },
            extras: { queryParamsHandling: 'merge' },
          })
        )
      );

    this._activatedRoute.queryParams
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe((query) => {
        if (query.prices) {
          this.selectedPrices = query.prices.split(',');
        }
        if (query.brands) {
          this.selectedBrands = query.brands.split(',');
        }
        this.form.setValue(
          {
            searchByName: query.searchByName ?? '',
            brands: this.selectedBrands,
            currentSubCategory: query.subCatId,
            prices: {
              low: this.selectedPrices[0],
              high: this.selectedPrices[1],
            },
          },
          { emitEvent: false }
        );
        this._store.dispatch(
          getProductsPending({
            selectedBrands: query.brands,
            currentCategory: query.subCatId,
            searchByName: query.searchByName,
            priceRange:
              (this.selectedPrices[0] && [
                this.selectedPrices[0],
                this.selectedPrices[1],
              ]) ||
              undefined,
          })
        );
        this._store.dispatch(
          getBrandsPending({
            id: query.subCatId,
            priceRange: this.selectedPrices,
          })
        );
      });
  }
}
