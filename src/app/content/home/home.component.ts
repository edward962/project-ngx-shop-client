import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { getCategoriesPending } from 'src/app/store/actions/category.actions';
import {
  ICategory,
} from 'src/app/store/reducers/categories.reducer';
import { IStore } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { IProduct } from '../category/store/reducers/products.reducer';

import { getSuggestedProductsPending } from './store/actions/suggested-products.actions';


@Component({
  selector: 'ngx-shop-products',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public categories: ICategory[] = [];
  public categories$: Observable<ICategory[]> = this._store.select('categories', 'items');
  public products$: Observable<IProduct[]> = this._store.select('suggestedProducts', 'items') ;

  constructor(
    private readonly _store: Store<IStore>,
  ) {
  }

  public ngOnInit() {
    this._store.dispatch(getCategoriesPending());
    this._store.dispatch(getSuggestedProductsPending());
  }
}
