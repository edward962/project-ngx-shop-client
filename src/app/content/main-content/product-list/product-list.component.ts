import { Component,OnInit} from '@angular/core';
import { ICategory } from 'src/app/interfaces/category.interface';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/shared/services/category.service';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit{
  public categories$: Observable<ICategory[]>;
  public inputForm = new FormControl('');
  public show: string;
  public currentIndex: number | null = null;
  public query: any;
  public products: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    public productsService: ProductsService

  ){}
  hover(index: number) {
    this.currentIndex = index;
  }
  ngOnInit(){
    this.productsService.getProducts()
    .subscribe( (data) => this.products = data)
    this.query = this.activatedRoute.snapshot.queryParams;
    this.categories$ = this.categoriesService.getCategories();
  }
}
