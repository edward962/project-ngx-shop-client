import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ICartProduct,
  selectProducts,
} from 'src/app/store/reducers/cart.reducer';

import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngx-shop-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  public cart$: Observable<ICartProduct[]> = this._store.select(selectProducts);
  // tslint:disable-next-line: variable-name
  constructor(private readonly _store: Store<IStore>) {}
  // tslint:disable-next-line: variable-name
  public trackById(_index: number, item: ICartProduct) {
    return item._id;
  }
}
