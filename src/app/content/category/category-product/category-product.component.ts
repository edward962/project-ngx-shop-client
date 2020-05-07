import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/store/reducers/cart.reducer';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import { addProductToCart } from 'src/app/store/actions/cart.actions';

@Component({
    selector: 'ngx-shop-category-product',
    templateUrl: './category-product.component.html',
  })
  export class CategoryProductComponent {
    @Input() public product!: IProduct;


    constructor(
        // private router: Router,
        // private activatedRoute: ActivatedRoute,
        // private categoriesService: CategoriesService,
        private store: Store<IStore>,
        // public productsService: ProductsService,
        // public brandsService: BrandsService
      ) {}

      public async addToBusket(product: IProduct): Promise<void> {
        this.store.dispatch(addProductToCart({ product }));
      }
  }


