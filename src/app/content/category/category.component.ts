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
import { debounce, debounceTime } from 'rxjs/operators';
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
    this.form.valueChanges.pipe(debounceTime(300)).subscribe((formData) => {
      //console.log(formData.prices.low, formData.prices.high);
      this.store.dispatch(
        go({
          path: ['/category'],
          query: {
            subCatId: formData.currentSubCategory,
            searchByName: formData.searchByName,
            prices: `${formData.prices.low},${formData.prices.high}`,
          },
        })
      );
    });
    this.store.dispatch(getCategoriesPending());
    this.activatedRoute.queryParams.subscribe((query) => {
      this.store.dispatch(
        getProductsPending({
          id: query.subCatId,
          priceRange: {
            value: query.prices.split(',')[0],
            highValue: query.prices.split(',')[1],
          },
        })
      );
      this.store.dispatch(
        getBrandsPending({
          id: query.subCatId,
          priceRange: {
            value: query.prices.split(',')[0],
            highValue: query.prices.split(',')[1],
          },
        })
      );

      this.form.setValue(
        {
          searchByName: '',
          brands: [],
          currentSubCategory: query.subCatId,
          prices: {
            low: query.prices.split(',')[0],
            high: query.prices.split(',')[1],
          },
        },
        { emitEvent: false }
      );
    });
  }
}
