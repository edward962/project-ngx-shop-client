import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import { addProductToCart } from 'src/app/store/actions/cart.actions';
import { ModalService } from 'src/app/modal/modal.service';
import { CardConfirmModalComponent } from 'src/app/shared/components/card-confirm-modal/card-confirm-modal.component';
import { go } from 'src/app/store/actions/router.actions';
import { IProduct } from 'src/app/shared/interfaces/product.inteface';

@Component({
  selector: 'ngx-shop-content-product',
  templateUrl: './product-card.component.html',
})
export class CategoryProductComponent {
  @Input() public product!: IProduct;

  constructor(
    private _modalService: ModalService,
    private readonly _store: Store<IStore>
  ) {}

  public async addToBusket(product: IProduct): Promise<void> {
    this._modalService.open({
      component: CardConfirmModalComponent,
      context: {
        product: { ...product },
        save: () => {
          this._store.dispatch(addProductToCart({ product }));
          this._modalService.close();
        },
        close: () => {
          this._modalService.close();
        },
      },
    });
  }
  public redirectTo(productId: string) {
    window.scroll(0, 0);
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
