import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/shared/services/category.service';
import { ICategory } from 'src/app/content/side-menu/interfaces/category.interface';
import { IProduct } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.sass']
})
export class MainContentComponent implements OnInit {
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
    // TODO
    this.products$ = this.productsService.getProducts().pipe(
      map((data: any) => {
        data[Symbol.iterator] = () => data.items[Symbol.iterator]();
        return data;
      })
    );
  }
}
