import { Component, Input } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent {
  @Input() public product!: IProduct;
}
