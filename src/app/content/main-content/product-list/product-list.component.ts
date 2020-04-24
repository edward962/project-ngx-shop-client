import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/interfaces/category.interface';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/shared/services/category.service';
import { Observable, Subject, of } from 'rxjs';
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
  public query$: Observable<any>;
  public products: any;
  public productsByProductName: any;
  public filteredByPriceProducts: any;
  public priceRange: any;



  // products$: Observable<any>;
  // private searchPrices = new Subject<any>();


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    public productsService: ProductsService
  ) {}
  hover(index: number) {
    this.currentIndex = index;
  }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( query => this.getProductsByIdCategory(query, this.priceRange));
    this.productsService.getProductsByProductName(name);
    this.categories$ = this.categoriesService.getCategories();
    // this.products$ = this.searchPrices.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((term: any) => this.productsService.getProductsFilteredByPrice(term, this.query.id)),
    //   // map( data => data.items)
    // );
    // this.products$.subscribe( i => console.log(i))
  }
  searchByProductName(name: string){
    this.productsService.getProductsByProductName(name)
    .subscribe( (data) => this.productsByProductName = data);
  }
  async currentProduct(id: string){
  }

  addToBusket(id){}

  
  getProductsByIdCategory( query: any, priceRange){
    this.query = query;
    this.productsService
    .getProductsBySubCategory(query.id, priceRange)
    .subscribe(
      (data) => (this.products = data)
    );
  }

  pricesValue( priceRange: any ){
    this.priceRange = priceRange;
    this.changeQuery(priceRange);
  }
  changeQuery(priceRange) {
    const  {id, name} =this.query;
    const{value, highValue} = priceRange;
    if(priceRange){
    this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: { id, name, lowPrice: value, highValue }});
    }
  }
  // ngDoCheck(){
  //   console.log(';sdjfnv;',   this.query)
  // }
 }
