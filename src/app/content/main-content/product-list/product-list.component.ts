import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/interfaces/category.interface';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/shared/services/category.service';
import { Observable, Subject } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';
import { distinctUntilChanged, map, switchMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
})
export class ProductListComponent implements OnInit {
  public categories$: Observable<ICategory[]>;
  public inputForm = new FormControl('');
  public show: string;
  public currentIndex: number | null = null;
  public query: any;
  public products: any;
  public productsByProductName: any;
  public filteredByPriceProducts: any;



  // products$: Observable<any>;
  // private searchPrices = new Subject<any>();


  constructor(
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    public productsService: ProductsService
  ) {}
  hover(index: number) {
    this.currentIndex = index;
  }
  ngOnInit() {
    this.query = this.activatedRoute.snapshot.queryParams;
    this.productsService
      .getProductsBySubCategory(this.query.id)
      .subscribe((data) => (this.products = data));
    this.productsService.getProductsByProductName(name);
    this.categories$ = this.categoriesService.getCategories();


    // this.products$ = this.searchPrices.pipe(
    //   debounceTime(1000),
    //   distinctUntilChanged(),
    //   switchMap((term: any) => this.productsService.getProductsFilteredByPrice(term, this.query.id)),
    //   map( hero => hero.data)
    // );
  }
  searchByProductName(name: string){
    this.productsService.getProductsByProductName(name)
    .subscribe( (data) => this.productsByProductName = data);
  }
  async currentProduct(id){
  }

  addToBusket(id){}

//   pricesValue(event){
//     this.searchPrices.next(event);
//   }
ngDoCheck(){
  // console.log(this.particularProduct)
}

 }
