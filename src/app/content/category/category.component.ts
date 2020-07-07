import { IProductsState } from 'src/app/content/category/store/reducers/products.reducer';
import { ICategoryState } from './../../store/reducers/categories.reducer';
import { UnSubscriber } from './../../shared/utils/unsubscriber';
import { getCategoriesPending } from 'src/app/store/actions/category.actions';
import { IStore } from 'src/app/store/reducers';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getProductsPending } from './store/actions/products.actions';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { getBrandsPending } from './store/actions/brands.actions';
import { debounceTime, takeUntil } from 'rxjs/operators';
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
    .pipe(takeUntil(this.unsubscribe$$));
  public products$: Observable<IProductsState> = this._store
    .select('products')
    .pipe(takeUntil(this.unsubscribe$$));
  public brands$: Observable<IBrandsState> = this._store
    .select('brands')
    .pipe(takeUntil(this.unsubscribe$$));
  public priceRange?: number[];
  public selectedBrands: string[] = [];
  public selectedPrices: number[] = [];
  public initSubCategoryId?: string;
  public form: FormGroup = this._fb.group({
    brands: [[]],
    prices: [[]],
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

  public ngOnInit(): void {
    this.brands$.subscribe((brands: IBrandsState): void => {
      this.selectedBrands = this.selectedBrands
        // tslint:disable-next-line: no-any
        .map((selectedBrand: string): any =>
          brands.items.find((brand: string): boolean => brand === selectedBrand)
        )
        .filter((item: string): string => item);
      this._store.dispatch(
        go({
          path: ['/category'],
          query: {
            brands: (this.selectedBrands as string[]).join(',') || undefined,
          },
          extras: { queryParamsHandling: 'merge' },
        })
      );
    });
    this._store.dispatch(getCategoriesPending());
    this.getForm$('currentSubCategory').subscribe(
      (currentSubCategory): void => {
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
      }
    );
    this.getForm$('brands').subscribe((brands): void => {
      this._store.dispatch(
        go({
          path: ['/category'],
          query: {
            brands: (brands as string[]).join(',') || undefined,
          },
          extras: { queryParamsHandling: 'merge' },
        })
      );
    });
    this.getForm$('prices').subscribe((prices): void => {
      this._store.dispatch(
        go({
          path: ['/category'],
          query: { prices: `${prices[0]},${prices[1]}` },
          extras: { queryParamsHandling: 'merge' },
        })
      );
    });
    this.getForm$('searchByName').subscribe((searchByName): void =>
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
      .subscribe((query): void => {
        this.initSubCategoryId = query.subCatId;
        if (query.prices) {
          this.selectedPrices = query.prices.split(',');
        } else {
          this.selectedPrices = [];
        }
        if (query.brands) {
          this.selectedBrands = query.brands.split(',');
        }
        this.form.setValue(
          {
            searchByName: query.searchByName ?? '',
            brands: this.selectedBrands,
            currentSubCategory: query.subCatId,
            prices: this.selectedPrices,
          },
          { emitEvent: false }
        );
        this._store.dispatch(
          getProductsPending({
            selectedBrands: query.brands,
            currentCategory: query.subCatId,
            searchByName: query.searchByName,
            priceRange: this.selectedPrices,
          })
        );
        this._store.dispatch(
          getBrandsPending({
            id: query.subCatId,
            prices: this.selectedPrices,
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
