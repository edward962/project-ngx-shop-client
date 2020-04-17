import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from './shared/services/category.service';
import { ICategory } from './side-menu/interfaces/category.interface';
import { IProduct } from './interfaces/product.interface';
import { ProductsService } from './shared/services/products.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'ngx-shop-client';
  public categories: ICategory[] = [];
  public categories$!: Observable<ICategory[]>;
  public products: IProduct[] = [];
  public products$!: Observable<IProduct[]>;
  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.categories$ = this.categoriesService.getCategories();
    this.products$ = this.productsService.getProducts().pipe(
      map((data: any) => {
        data[Symbol.iterator] = () => data.items[Symbol.iterator]();
        return data;
      })
    );
  }
}
