import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngx-shop-product-photo',
    templateUrl: './product-photo.component.html',
  })
export class ProductPhotoComponent {
    // tslint:disable-next-line: no-any
    @Input() public product: any;
    public currentIndex = 0;


public next() {
    if (this.currentIndex === this.product.images.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex += 1;
    }
  }
  public prev() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.product.images.length - 1;
    } else {
      this.currentIndex -= 1;
    }
  }
  show(i: number){
    this.currentIndex = i
  }
}