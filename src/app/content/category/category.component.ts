import { IStore } from 'src/app/store/reducers';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/shared/services/category.service';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Store } from '@ngrx/store';
import { BrandsService } from 'src/app/shared/services/brands.service';
import { ICategory } from 'src/app/store/reducers/categories.reducer';
import { getProductsPending } from 'src/app/store/actions/products.actions';

export interface IPriceData {
  value: number;
  highValue: number;
}

export interface IProductQuery {
  id?: string;
  name?: string;
  value?: string;
  highValue?: string;
  productName?: string;
  brandsQuery?: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  public categories$: Observable<ICategory[]> | undefined;
  public show: string | undefined;
  public query!: IProductQuery;
  // tslint:disable-next-line: no-any
  public products$: Observable<any> = this.store.select('products', 'items');
  public priceRange!: IPriceData;
  public productName = '';
  // tslint:disable-next-line: no-any
  public brands: any;
  public selectedBrands = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    private store: Store<IStore>,
    public productsService: ProductsService,
    public brandsService: BrandsService
  ) {}

  public ngOnInit() {
    this.activatedRoute.queryParams.subscribe((query) =>
      this.getProductsByIdCategory(query, this.priceRange, this.selectedBrands)
    );
    this.categories$ = this.categoriesService.getCategories();
  }

  public getProductsByIdCategory(
    // tslint:disable-next-line: no-any
    query: any,
    priceRange: IPriceData,
    selectedBrands: string
  ) {
    this.query = query;
    const search = {
      id: query.id,
      priceRange,
      productName: query.name,
      selectedBrands,
    };
    this.store.dispatch(getProductsPending(search));
    this.brandsService
      .getBrands(query.id, priceRange)
      .subscribe((brands) => (this.brands = brands));
  }

  public pricesValue(priceRange: IPriceData) {
    this.priceRange = priceRange;
    this.addPriceToQuery(priceRange);
  }

  public addPriceToQuery(priceRange: IPriceData) {
    const { id, name } = this.query;
    const { value, highValue } = priceRange;
    if (priceRange) {
      this.router.navigate(['.'], {
        relativeTo: this.activatedRoute,
        queryParams: { id, name, value, highValue },
      });
    }
  }

  public addProductNameToQuery(productName: string) {
    this.productName = productName;
    const { id, name, value, highValue } = this.query;
    if (productName) {
      this.router.navigate(['.'], {
        relativeTo: this.activatedRoute,
        queryParams: { id, name, value, highValue, productName },
      });
    }
  }

  public getBrands(brands: string[]) {
    const brandsForQuery = brands.join(',');
    this.selectedBrands = brandsForQuery;
    const { id, name, value, highValue, productName } = this.query;
    if (brands.join(',')) {
      this.router.navigate(['.'], {
        relativeTo: this.activatedRoute,
        queryParams: {
          id,
          name,
          value,
          highValue,
          productName,
          brandsQuery: brandsForQuery,
        },
      });
    }
    const { brandsQuery } = this.query;
    if (brandsQuery) {
      if (brandsForQuery < brandsQuery && brandsForQuery.length === 0) {
        this.router.navigate(['.'], {
          relativeTo: this.activatedRoute,
          queryParams: { id, name, value, highValue, productName },
        });
      }
    }
  }
}
