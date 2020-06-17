import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { slideAnimation } from './carusel.slider.animation';



@Component({
  selector: 'ngx-shop-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass'],
  animations: slideAnimation,
})
export class CarouselComponent{
  public images = [
    {
      url: 'https://i2.rozetka.ua/owoxads/sliders/20/20389.jpg',
      title: '',
    },
    {
      url: 'https://i2.rozetka.ua/owoxads/sliders/20/20473.jpg',
      title: '',
    },
    {
      url: 'https://i1.rozetka.ua/owoxads/sliders/20/20677.jpg',
      title: '',
    }
  ];
  public currentIndex = 0;

  public animateRight = { translateEnter: 'translateX(100%)', translateLeave: 'translateX(-100%)' };
  public animateLeft = { translateEnter: 'translateX(-100%)', translateLeave: 'translateX(100%)' };
  public isSlidedRight = true;
  public slidingBlocked = false;
  constructor(
    private readonly _cdr: ChangeDetectorRef,
  ){}

  public next() {
    if (this.slidingBlocked) {
      return;
    }
    this.isSlidedRight = true;
    this._cdr.detectChanges();
    if (this.currentIndex === this.images.length - 1) {
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
    this._cdr.detectChanges();
    if (this.currentIndex === 0) {
      this.currentIndex = this.images.length - 1;
      return;
    }
    this.currentIndex -= 1;
  }

  public show(i: number) {
    if (this.slidingBlocked) {
      return;
    }
    this.isSlidedRight = this.currentIndex < i;
    this._cdr.detectChanges();
    this.currentIndex = i;
  }

  public animationStart() {
    this.slidingBlocked = true;
  }

  public animationEnd() {
    this.slidingBlocked = false;
  }

  public getImgUrl(image: any) {
    return `url(${image?.url})`
  }
}
