import { Component } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { product } from '../data/products';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent {
  public products: IProduct[] = product;
}
