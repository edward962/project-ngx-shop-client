import {
  Component,
  Input,
  ComponentFactoryResolver,
  Injector,
  Output,
  EventEmitter,
} from '@angular/core';
import { addProductToCart } from 'src/app/store/actions/cart.actions';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import { ModalService } from 'src/app/modal/modal.service';
import { CardConfirmModalComponent } from 'src/app/shared/components/card-confirm-modal/card-confirm-modal.component';
import { IProduct } from '../../../../../store/reducers/products.reducer';

@Component({
  selector: 'ngx-shop-information',
  templateUrl: './information.component.html',
})
export class InformationComponent {
  // tslint:disable-next-line: no-any
  @Input() public product: any;
  @Output()
  public addReview: EventEmitter<any> = new EventEmitter<any>();
  public isShow = false;

  constructor(
    private store: Store<IStore>,
    private _modalService: ModalService,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _injector: Injector
  ) {}
  public async addToBusket(product: IProduct): Promise<void> {
     this._modalService.open({
      component: CardConfirmModalComponent,
      resolver: this._componentFactoryResolver,
      injector: this._injector,
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

  public show() {
    this.isShow = !this.isShow;
  }
  public addFeedback() {
    this.addReview.emit();
  }
}
