import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import { go } from 'src/app/store/actions/router.actions';
import { IProduct } from 'src/app/shared/interfaces/product.inteface';

@Component({
  selector: 'ngx-shop-product-card',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input()
  public product!: IProduct;
  constructor(private readonly _store: Store<IStore>) {}

  public redirectTo(productId: string) {
    this._store.dispatch(
      go({
        path: ['/category/product'],
        query: {
          id: productId,
        },
      })
    );
  }
}
