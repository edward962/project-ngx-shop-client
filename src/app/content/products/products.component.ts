import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getCategoriesPending } from 'src/app/store/actions/category.actions';
import {
  ICategoryState,
  ICategory,
} from 'src/app/store/reducers/categories.reducer';
import { IStore } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { IProduct } from 'src/app/store/reducers/cart.reducer';

@Component({
  selector: 'app-products',
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

  public filterForm: FormGroup | undefined;

  constructor(
    private store: Store<IStore & { categories: ICategoryState }>,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      subcategory: [''],
    });
    const query = this.activatedRoute.snapshot.queryParams;
    this.filterForm.patchValue(query);
    this.store.dispatch(getCategoriesPending());
    // TODO
    this.products$ = this.productsService.getProducts().pipe(
      map((data: any) => {
        data[Symbol.iterator] = () => data.items[Symbol.iterator]();
        return data;
      })
    );
  }
}
