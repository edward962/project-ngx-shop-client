import { IStore } from 'src/app/store/reducers';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { BrandsService } from 'src/app/shared/services/brands.service';
import { ICategory } from 'src/app/store/reducers/categories.reducer';
import { getCategoriesPending } from '../../store/actions/category.actions';
import { getProductsPending } from './store/actions/products.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  public categories$: Observable<ICategory[]> = this.store.select('categories', 'items');
  public show: string | undefined;
  public query!: IProductQuery;
  // tslint:disable-next-line: no-any
  public products$: Observable<any> = this.store.select('products', 'items');
  public priceRange!: IPriceData;
  public productName = '';
  // tslint:disable-next-line: no-any
  public brands: any;
  public selectedBrands = '';
  public form: FormGroup = this.fb.group({
    currentCategory: [{}],
    searchByName: ['']
  });

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store<IStore>,
  ) { }

  public ngOnInit() {
    this.store.dispatch(getCategoriesPending());
    this.activatedRoute.queryParams.subscribe((query) =>
      this.query = query
    );

    this.form.valueChanges.subscribe((formData) => this.store.dispatch(getProductsPending(formData)))
  }
}
