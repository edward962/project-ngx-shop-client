import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/shared/services/category.service';
import { ICategory } from 'src/app/interfaces/category.interface';
import { IProduct } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  public filterForm: FormGroup | undefined ;

  constructor(
    private categoriesService: CategoriesService,
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
