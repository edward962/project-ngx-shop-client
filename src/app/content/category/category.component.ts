import {
  ICategory,
  ISubCategory,
} from 'src/app/store/reducers/categories.reducer';
import { IProductsState } from 'src/app/content/category/store/reducers/products.reducer';
import { UnSubscriber } from './../../shared/utils/unsubscriber';
import { getCategoriesPending } from 'src/app/store/actions/category.actions';
import { IStore } from 'src/app/store/reducers';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, combineLatest, forkJoin, EMPTY } from 'rxjs';
import { Store } from '@ngrx/store';
import { getProductsPending } from './store/actions/products.actions';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { getBrandsPending } from './store/actions/brands.actions';
import {
  debounceTime,
  takeUntil,
  switchMap,
  map,
  mergeMap,
  filter,
  tap,
  take,
  pluck,
  withLatestFrom,
  distinctUntilChanged,
} from 'rxjs/operators';
import { go } from 'src/app/store/actions/router.actions';
import { IBrandsState } from './store/reducers/brands.reducer';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  public ngOnInit(): void {
    this._store.dispatch(getCategoriesPending());
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
        this.selectedPrices = query.price ? query.prices.split(',') : [];
        this.selectedBrands = query.brands ? query.brands.split(',') : [];
        this.form.setValue(
          {
            searchByName: query.searchByName ?? '',
            brands: this.selectedBrands,
            currentSubCategory: subCategory,
            prices: this.selectedPrices,
          },
          { emitEvent: false }
        );
        this._store.dispatch(
          getProductsPending({
            selectedBrands: query.brands,
            currentCategory: subCategory,
            searchByName: query.searchByName,
            priceRange: this.selectedPrices,
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
      .pipe(debounceTime(300), takeUntil(this.unsubscribe$$))
      .subscribe((form) => {
        this._store.dispatch(
          go({
            path: ['/category', form.currentSubCategory],
            query: {
              prices: form.prices[0]
                ? `${form.prices[0]},${form.prices[1]}`
                : undefined,
              brands: (form.brands as string[]).join(',') || undefined,
              searchByName: form.searchByName || undefined,
            },
            extras: { replaceUrl: true },
          })
        );
      });

    // this.brands$
    //   .pipe(withLatestFrom(category$))
    //   .subscribe(([brands, subCategory]: [IBrandsState, string]): void => {
    //     if (brands.items.length > 0) {
    //       this.selectedBrands = this.selectedBrands
    //         // tslint:disable-next-line: no-any
    //         .map((selectedBrand: string): any =>
    //           brands.items.find(
    //             (brand: string): boolean => brand === selectedBrand
    //           )
    //         )
    //         .filter((item: string): string => item);
    //     }
    //     console.log('ne huta', brands, subCategory);
    //     this._store.dispatch(
    //       go({
    //         path: ['/category', subCategory],
    //         query: {
    //           brands: (this.selectedBrands as string[]).join(',') || undefined,
    //         },
    //         extras: { queryParamsHandling: 'merge' },
    //       })
    //     );
    //   });

    // this.getForm$('currentSubCategory').subscribe(
    //   // tslint:disable-next-line:no-any
    //   (currentSubCategory: any): void => {
    //     this.selectedBrands = [];
    //     this._store.dispatch(
    //       go({
    //         path: ['/category', currentSubCategory],
    //         extras: { replaceUrl: true },
    //       })
    //     );
    //   }
    // );
    // this.getForm$('brands')
    //   .pipe(withLatestFrom(category$))
    //   .subscribe(([brands, subCategory]): void => {
    //     if (brands) {
    //       console.log('pizda');
    //       this._store.dispatch(
    //         go({
    //           path: ['/category', subCategory],
    //           query: {
    //             brands: (brands as string[]).join(',') || undefined,
    //           },
    //           extras: { queryParamsHandling: 'merge' },
    //         })
    //       );
    //     }
    //   });
    // this.getForm$('prices')
    //   .pipe(withLatestFrom(this.category$))
    //   .subscribe(([prices, subCategory]: [any, string]): void => {
    //     console.log('zalupa');
    //     this._store.dispatch(
    //       go({
    //         path: ['/category', subCategory],
    //         query: { prices: `${prices[0]},${prices[1]}` },
    //         extras: { queryParamsHandling: 'merge' },
    //       })
    //     );
    //   });
    // this.getForm$('searchByName')
    //   .pipe(withLatestFrom(category$))
    //   .subscribe(([searchByName, subCategory]): void => {
    //     console.log('hueta');
    //     this._store.dispatch(
    //       go({
    //         path: ['/category', subCategory],
    //         query: { searchByName },
    //         extras: { queryParamsHandling: 'merge' },
    //       })
    //     );
    //   });
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
