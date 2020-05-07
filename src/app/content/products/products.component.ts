import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';
import { map } from 'rxjs/operators';
import { getCategoriesPending } from 'src/app/store/actions/category.actions';
import {
  ICategoryState,
  ICategory,
} from 'src/app/store/reducers/categories.reducer';
import { IStore } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { IProduct } from 'src/app/store/reducers/cart.reducer';

@Component({
  selector: 'ngx-shop-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  public categories: ICategory[] = [];
  public categories$: Observable<ICategory[]> = this.store.select(
    'categories',
    'items'
  );
  public products: IProduct[] = [];
  public products$!: Observable<IProduct[]>;

  constructor(
    private store: Store<IStore & { categories: ICategoryState }>,
    private productsService: ProductsService,
  ) {}

  public ngOnInit() {
    this.store.dispatch(getCategoriesPending());
    this.products$ = this.productsService.getProducts().pipe(
      // tslint:disable-next-line: no-any
      map((data: any) => {
        data[Symbol.iterator] = () => data.items[Symbol.iterator]();
        return data;
      })
    );
  }
}
