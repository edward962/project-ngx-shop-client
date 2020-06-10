import { Component, Input, NgModule } from '@angular/core';
import { IProduct } from '../../../../../store/reducers/products.reducer';
import { RatingComponent } from './feedbacks/rating/rating.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-shop-product-description',
  templateUrl: './description.component.html',
})
export class DescriptionComponent {
  @Input() public product!: IProduct;
  public isShowDescription = true;

  public toggleTab() {
    this.isShowDescription = !this.isShowDescription;
  }

  public close!: () => void;
  public save!: (value: object) => void;
}
