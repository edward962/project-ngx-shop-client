import { Component, Input } from '@angular/core';
import { IProduct } from '../../../../store/reducers/products.reducer';

@Component({
  selector: 'ngx-shop-product-description',
  templateUrl: './product-description.component.html',
})
export class ProductDescriptionComponent {
  @Input() public product!: IProduct;
  public isShowDescription = true;

  public toggleTab() {
    this.isShowDescription = !this.isShowDescription;
  }

}
