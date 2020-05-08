import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/store/reducers/cart.reducer';
import { addProductToCart } from 'src/app/store/actions/cart.actions';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';

@Component({
  selector: 'ngx-shop-product-information',
  templateUrl: './product-Information.component.html',
})
export class ProductInformationComponent {
  // tslint:disable-next-line: no-any
  @Input() public product: any;
  public isShow = false;

  constructor(
    private store: Store<IStore>,
  ) {}
  public async addToBusket(product: IProduct): Promise<void> {
    this.store.dispatch(addProductToCart({ product }));
  }

  public show() {
    this.isShow = !this.isShow;
  }
}
