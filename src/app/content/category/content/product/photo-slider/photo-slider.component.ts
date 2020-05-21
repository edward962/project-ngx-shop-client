import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { IProduct } from '../../../../../store/reducers/products.reducer';
import { slideAnimation } from './photo-slider.animation';

@Component({
  selector: 'ngx-shop-product-photo',
  templateUrl: './photo-slider.component.html',
  animations: slideAnimation,
})
export class PhotoSliderComponent {
  @Input() public product!: IProduct;
  public currentIndex = 0;

  public animateRight = { translateEnter: 'translateX(100%)', translateLeave: 'translateX(-100%)' };
  public animateLeft = { translateEnter: 'translateX(-100%)', translateLeave: 'translateX(100%)' };
  public isSlidedRight = true;
  public slidingBlocked = false;

  constructor(
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  public next() {
    if (this.slidingBlocked) {
      return;
    }
    this.isSlidedRight = true;
    this.cdr.detectChanges();
    if (this.currentIndex === this.product.images.length - 1) {
      this.currentIndex = 0;
      return;
    }
    this.currentIndex += 1;
  }

  public prev() {
    if (this.slidingBlocked) {
      return;
    }
    this.isSlidedRight = false;
    this.cdr.detectChanges();
    if (this.currentIndex === 0) {
      this.currentIndex = this.product.images.length - 1;
      return;
    }
    this.currentIndex -= 1;
  }

  public show(i: number) {
    if (this.slidingBlocked) {
      return;
    }
    this.isSlidedRight = this.currentIndex < i;
    this.cdr.detectChanges();
    this.currentIndex = i;
  }

  public animationStart() {
    this.slidingBlocked = true;
  }

  public animationEnd() {
    this.slidingBlocked = false;
  }
}

