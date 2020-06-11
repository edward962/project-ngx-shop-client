import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { getCategoriesPending } from 'src/app/store/actions/category.actions';
import {
  ICategory,
} from 'src/app/store/reducers/categories.reducer';
import { IStore } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { getProductsPending, getSuggestedProductsPending } from '../../store/actions/products.actions';
import { IProduct } from '../category/store/reducers/products.reducer';

@Component({
  selector: 'ngx-shop-products',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public categories: ICategory[] = [];
  public categories$: Observable<ICategory[]> = this.store.select('categories', 'items');
  public products$: Observable<IProduct[]> = this.store.select('products','suggestedProducts') ;

  constructor(
    private store: Store<IStore>,
  ) {
  }

  public ngOnInit() {
    this.store.dispatch(getCategoriesPending());
    this.store.dispatch(getProductsPending({}));
    this.store.dispatch(getSuggestedProductsPending({}));
  }
}
