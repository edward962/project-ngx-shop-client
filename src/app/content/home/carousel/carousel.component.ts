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
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQp_lDXF3nN_o7wjtXLskGvjgjyFRBmIl4pHCX_J_mx-HSrg-8&usqp=CAU',
      title: '',
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcStJ32zQ6CbAXZ-7j8FzSJkIvbsLwrQx3PwrmTUqXBR9Orfe7bH&usqp=CAU',
      title: '',
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTrmsjCuIJVBwyO7qSS6yeoTalqK_TTDczhANud1-UA2zpXoYAD&usqp=CAU',
      title: '',
    },

    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR34SsksiaBPnLJ7M9GGV235tXP80ZzXCnbrhjGEAV-ErGXiDBi&usqp=CAU',
      title: '',
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqbKWwn2WcCZ_57Zeb2MF2f8LxRX3deBiNQDNyiYUDYncwSE1r&usqp=CAU',
      title: '',
    } 
  ];
  public currentIndex = 0;

  public animateRight = { translateEnter: 'translateX(100%)', translateLeave: 'translateX(-100%)' };
  public animateLeft = { translateEnter: 'translateX(-100%)', translateLeave: 'translateX(100%)' };
  public isSlidedRight = true;
  public slidingBlocked = false;
  constructor(
    private readonly cdr: ChangeDetectorRef,
  ){}

  public next() {
    if (this.slidingBlocked) {
      return;
    }
    this.isSlidedRight = true;
    this.cdr.detectChanges();
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
    this.cdr.detectChanges();
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
