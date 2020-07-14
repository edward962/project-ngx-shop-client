import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { addProductToCart } from 'src/app/store/actions/cart.actions';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import { IProduct } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'ngx-shop-information',
  templateUrl: './information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  @Input()
  public product?: IProduct;
  public isShow = false;

  constructor(private readonly _store: Store<IStore>) {}
  public async addToBasket(product: IProduct): Promise<void> {
    this._store.dispatch(addProductToCart({ product }));
  }

  public show(): void {
    this.isShow = !this.isShow;
  }
}
