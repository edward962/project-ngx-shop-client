import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { getCategoriesPending } from 'src/app/store/actions/category.actions';
import {
  ICategory,
} from 'src/app/store/reducers/categories.reducer';
import { IStore } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { IProduct } from '../../store/reducers/products.reducer';
import { getProductsPending } from '../../store/actions/products.actions';

@Component({
  selector: 'ngx-shop-products',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public categories: ICategory[] = [];
  public categories$: Observable<ICategory[]> = this.store.select('categories', 'items');
  public products$: Observable<IProduct[]> = this.store.select('products', 'items');

  constructor(
    private store: Store<IStore>,
  ) {
  }

  public ngOnInit() {
    this.store.dispatch(getCategoriesPending());
    // TODO should call resent/popular products prev  solution was call on /products
    this.store.dispatch(getProductsPending({}));
  }
}
