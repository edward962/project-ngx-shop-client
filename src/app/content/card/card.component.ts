import { Component } from '@angular/core';
import { product } from 'src/app/data/products';
import { IProduct } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent {
  public products: IProduct[] = product;
}
