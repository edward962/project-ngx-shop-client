import { IStore } from 'src/app/store/reducers';
import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/interfaces/category.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/shared/services/category.service';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/interfaces/product.interface';
import { addProductToCart } from 'src/app/store/actions/cart.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
})
export class ProductListComponent implements OnInit {

  public categories$: Observable<ICategory[]>;
  public show: string;
  public isShow = false;
  public currentIndex: number | null = null;
  public query: any;
  public query$: Observable<any>;
  public products: any;
  public productsByProductName: any;
  public filteredByPriceProducts: any;
  public priceRange: any;
  public productName: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    private store: Store<IStore>,
    public productsService: ProductsService
  ) {}


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( 
         query => this.getProductsByIdCategory(query, this.priceRange, this.productName));
    this.categories$ = this.categoriesService.getCategories();

  }
  public hover(index: number) {
    this.currentIndex = index;
    this.isShow = !this.isShow;
  }

  public getProductsByIdCategory( query: any, priceRange: any, productName: string){
    this.query = query;
    this.productsService
    .getProductsBySubCategory(query.id, priceRange, productName)
    .subscribe(
      (data) => (this.products = data)
    );
  }

  async currentProduct(id) {}

  public pricesValue( priceRange: any ){
    this.priceRange = priceRange;
    this.addPriceToQuery(priceRange);
  }

  public addPriceToQuery(priceRange) {
    const  {id, name} = this.query;
    const{value, highValue} = priceRange;
    if (priceRange){
    this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: { id, name, lowPrice: value, highValue }});
    }
  }

  public addProductNameToQuery(productName: string) {
    this. productName = productName;
    const  {id, name, value, highValue} = this.query;
    if (productName){
      this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: { id, name, lowPrice: value, highValue, productName }});
      }
  }

  public async addToBusket(product: IProduct): Promise<void> {
    this.store.dispatch(addProductToCart({ product }));
  }
 }
