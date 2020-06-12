import { Component, Input } from '@angular/core';
import { IProduct } from '../../category/store/reducers/products.reducer';

@Component({
  selector: 'ngx-shop-product-card',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() 
  public product!: IProduct;
}
