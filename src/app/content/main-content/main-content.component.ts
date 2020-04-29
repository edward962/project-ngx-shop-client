import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/interfaces/category.interface';
import { IProduct } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getCategoriesPending } from 'src/app/store/actions/category.actions';
import { ICategoryState } from 'src/app/store/reducers/categories.reducer';
import { IStore } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.sass']
})
export class MainContentComponent implements OnInit {
  public categories: ICategory[] = [];
  public categories$: Observable<any>
  = this.store.select(
    'categories', 'items'
  );
  public products: IProduct[] = [];
  public products$!: Observable<IProduct[]>;

  public filterForm: FormGroup | undefined ;

  constructor(
    private store: Store<IStore & { categories: ICategoryState }>,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      subcategory: ['']
    });
    const query = this.activatedRoute.snapshot.queryParams;
    this.filterForm.patchValue(query);
    this.store.dispatch(getCategoriesPending());
    // this.categories$ = this.categoriesService.getCategories();
    this.categories$.subscribe(i => console.log(i));
    // TODO
    this.products$ = this.productsService.getProducts().pipe(
      map((data: any) => {
        data[Symbol.iterator] = () => data.items[Symbol.iterator]();
        return data;
      })
    );
  }
}
