import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStore } from '@root-store/reducers';
import { go } from '@root-store/actions/router.actions';
import { IProduct } from '@product-store/reducers/product.reducer';

@Component({
  selector: 'ngx-shop-product-card',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input()
  public product!: IProduct;
  constructor(private readonly _store: Store<IStore>) {}

  public redirectTo(productId: string): void {
    this._store.dispatch(
      go({
        path: ['/category', this.product.subCategory, this.product._id],
      })
    );
  }
}
