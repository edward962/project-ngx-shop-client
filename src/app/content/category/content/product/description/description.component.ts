import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.inteface';
@Component({
  selector: 'ngx-shop-product-description',
  templateUrl: './description.component.html',
})
export class DescriptionComponent {
  @Input() public product!: IProduct;
  public isShowDescription = true;
  public close!: () => void;
  public save!: (value: object) => void;
  public toggleTab(): void {
    this.isShowDescription = !this.isShowDescription;
  }


}
