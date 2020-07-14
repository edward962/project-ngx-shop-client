import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import { addProductToCart } from 'src/app/store/actions/cart.actions';
import { go } from 'src/app/store/actions/router.actions';
import { IProduct } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'ngx-shop-content-product',
  templateUrl: './product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryProductComponent {
  @Input()
  public product!: IProduct;
  @Input()
  public subCategory!: string;

  constructor(private readonly _store: Store<IStore>) {}

  public async addToBasket(product: IProduct): Promise<void> {
    this._store.dispatch(addProductToCart({ product }));
  }
  public redirectTo(): void {
    window.scroll(0, 0);
    this._store.dispatch(
      go({
        path: ['/category', this.product.subCategory, this.product._id],
      })
    );
  }
}
