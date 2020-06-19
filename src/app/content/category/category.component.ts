import { UnSubscriber } from './../../shared/utils/unsubscriber';
import { getCategoriesPending } from 'src/app/store/actions/category.actions';
import { IStore } from 'src/app/store/reducers';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { ICategory } from 'src/app/store/reducers/categories.reducer';
import { getProductsPending } from './store/actions/products.actions';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { getBrandsPending } from './store/actions/brands.actions';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { go } from 'src/app/store/actions/router.actions';
import { IProduct } from 'src/app/shared/interfaces/product.inteface';

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
  public selectedBrands: string[] = [];
  public selectedPrices: number[] = [];
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

  public ngOnInit() {
    this._store.dispatch(getCategoriesPending());
    this.getForm$('currentSubCategory').subscribe((currentSubCategory) => {
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
    this.getForm$('brands').subscribe((brands) =>
      this._store.dispatch(
        go({
          path: ['/category'],
          query: {
            brands: (brands as string[]).join(',') || undefined,
          },
          extras: { queryParamsHandling: 'merge' },
        })
      )
    );
    this.getForm$('prices').subscribe((prices) => {
      this._store.dispatch(
        go({
          path: ['/category'],
          query: { prices: `${prices[0]},${prices[1]}` },
          extras: { queryParamsHandling: 'merge' },
        })
      );
    });
    this.getForm$('searchByName').subscribe((searchByName) =>
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
        } else {
          this.selectedPrices = [];
        }
        if (query.brands) {
          this.selectedBrands = query.brands.split(',');
        }
        console.log(this.selectedPrices);
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
