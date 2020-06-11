import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { IProduct } from '../../category/content/product/store/reducers/product.reducer';
import { IStore } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { slideAnimation } from './carusel.slider.animation';



@Component({
  selector: 'ngx-shop-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass'],
  animations: slideAnimation,
})
export class CarouselComponent{
  public products$: Observable<any> = this.store.select('suggestedProducts', 'items');
  public product!: IProduct;
  public currentIndex = 0;

  public animateRight = { translateEnter: 'translateX(100%)', translateLeave: 'translateX(-100%)' };
  public animateLeft = { translateEnter: 'translateX(-100%)', translateLeave: 'translateX(100%)' };
  public isSlidedRight = true;
  public slidingBlocked = false;
  constructor(
    private store: Store<IStore>,
    private readonly cdr: ChangeDetectorRef,
  ){}

ngOnInit(){
  this.products$?.subscribe((products) => ( products ?  this.product =  products[5] : null));
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
