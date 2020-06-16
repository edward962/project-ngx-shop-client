import { getCategoriesPending } from 'src/app/store/actions/category.actions';
import { IStore } from 'src/app/store/reducers';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { Store } from '@ngrx/store';
import { ICategory } from 'src/app/store/reducers/categories.reducer';
import { getProductsPending } from './store/actions/products.actions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { getBrandsPending } from './store/actions/brands.actions';
import { debounce } from 'rxjs/operators';

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
export class CategoryComponent implements OnInit {
  public categories$: Observable<ICategory[]> = this.store.select(
    'categories',
    'items'
  );
  public show: string | undefined;
  // tslint:disable-next-line: no-any
  public products$: Observable<any> = this.store.select('products', 'items');
  public priceRange!: IPriceData;
  public productName = '';
  // tslint:disable-next-line: no-any
  public brands: any;
  public selectedBrands = '';
  public form: FormGroup = this.fb.group({
    brands: [[]],
    prices: [{}],
    currentSubCategory: [{}],
    searchByName: [''],
  });

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store<IStore>
  ) {}

  public ngOnInit() {
    this.form.valueChanges
      .pipe(debounce(() => interval(1000)))
      .subscribe((formData) => {
        console.log(formData);
        this.store.dispatch(
          getProductsPending({
            id: formData.currentSubCategory,
            priceRange: {
              value: formData.prices.low,
              highValue: formData.prices.high,
            },
          })
        );
        this.store.dispatch(
          getBrandsPending({
            id: formData.currentSubCategory,
            priceRange: {
              value: formData.prices.low,
              highValue: formData.prices.high,
            },
          })
        );
      });
    this.store.dispatch(getCategoriesPending());
    this.activatedRoute.queryParams.subscribe((query) => {
      this.form.setValue({
        searchByName: '',
        brands: [],
        currentSubCategory: query.subCatId,
        prices: {
          low: query.prices.split(',')[0],
          high: query.prices.split(',')[1],
        },
      });
    });
  }
}
