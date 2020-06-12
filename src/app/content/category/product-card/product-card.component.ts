import { Component, Input} from '@angular/core';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import { addProductToCart } from 'src/app/store/actions/cart.actions';
import { ModalService } from 'src/app/modal/modal.service';
import { CardConfirmModalComponent } from 'src/app/shared/components/card-confirm-modal/card-confirm-modal.component';
import { IProduct } from '../store/reducers/products.reducer';

@Component({
  selector: 'ngx-shop-content-product',
  templateUrl: './product-card.component.html',
})
export class CategoryProductComponent {
  @Input() public product!: IProduct;

  constructor(
    private store: Store<IStore>,
    private _modalService: ModalService,
  ) {}

  public async addToBusket(product: IProduct): Promise<void> {
    this._modalService.open({
      component: CardConfirmModalComponent,
      context: {
        product: { ...product },
        save: () => {
          this.store.dispatch(addProductToCart({ product }));
          this._modalService.close();
        },
        close: () => {
          this._modalService.close();
        },
      },
    });
  }
}
