import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/store/reducers/cart.reducer';


@Component({
  selector: 'ngx-shop-card-confirm-modal',
  templateUrl: './card-confirm-modal.component.html',
  styleUrls: ['./card-confirm-modal.component.sass'],
})
export class CardConfirmModalComponent {
  @Input()
  public product!: IProduct;
  public close!: () => void;
  public save!: () => void;
}
