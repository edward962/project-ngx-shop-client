import { Component, Input } from '@angular/core';
import { addProductToCart } from 'src/app/store/actions/cart.actions';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import { ModalService } from 'src/app/modal/modal.service';
import { CardConfirmModalComponent } from 'src/app/shared/components/card-confirm-modal/card-confirm-modal.component';
import { IProduct } from 'src/app/shared/interfaces/product.inteface';

@Component({
  selector: 'ngx-shop-information',
  templateUrl: './information.component.html',
})
export class InformationComponent {
  @Input()
  public product?: IProduct;
  public isShow = false;

  constructor(
    private readonly _store: Store<IStore>,
    private readonly _modalService: ModalService
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

  public show() {
    this.isShow = !this.isShow;
  }
}
