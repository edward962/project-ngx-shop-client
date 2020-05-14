import { Component, Input, ComponentFactoryResolver, Injector } from '@angular/core';
import { IProduct } from 'src/app/store/reducers/cart.reducer';
import { addProductToCart } from 'src/app/store/actions/cart.actions';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import { ModalService } from 'src/app/modal/modal.service';
import { CardConfirmModalComponent } from 'src/app/content/cart/card-confirm-modal/card-confirm-modal.component';

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
    private _modalService: ModalService,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _injector: Injector,
  ) {}
  public async addToBusket(product: IProduct): Promise<void> {
    this.store.dispatch(addProductToCart({ product }));
    // this._modalService.open({
    //       component: CardConfirmModalComponent,
    //       resolver: this._componentFactoryResolver,
    //       injector: this._injector,
    //       context: {
    //         product: { ...product },
    //         save: () => {
    //           this.store.dispatch(addProductToCart({ product }));
    //           this._modalService.close();
    //         },
    //         close: () => {
    //           this._modalService.close();
    //         },
    //       },
    //     });
  };

  public show() {
    this.isShow = !this.isShow;
  }
}




// public addProduct(product: IProduct): void {
//   this._modalService.open({
//     component: CardConfirmModalComponent,
//     resolver: this._componentFactoryResolver,
//     injector: this._injector,
//     context: {
//       product: { ...product },
//       save: () => {
//         this.store.dispatch(addProductToCart({ product }));
//         this._modalService.close();
//       },
//       close: () => {
//         this._modalService.close();
//       },
//     },
//   });
// }