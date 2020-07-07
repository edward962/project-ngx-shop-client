import { ChangeDetectorRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

export const slideAnimation = [
  trigger('slideAnimation', [
    transition(
      ':enter',
      [
        style({ transform: '{{translateEnter}}' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
      ],
      { params: { translateEnter: 'translateX(100%)' } }
    ),
    transition(
      ':leave',
      [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in-out', style({ transform: '{{translateLeave}}' })),
      ],
      { params: { translateLeave: 'translateX(-100%)' } }
    ),
  ]),
];
export const initSliderAnimation = trigger('initSliderAnimation', [
  transition(':enter', []),
]);

export abstract class Slider<T> {
  public abstract items: T[] = [];
  public currentIndex = 0;
  public isSlidedRight = true;
  public slidingBlocked = false;

  public animateRight = {
    translateEnter: 'translateX(100%)',
    translateLeave: 'translateX(-100%)',
  };
  public animateLeft = {
    translateEnter: 'translateX(-100%)',
    translateLeave: 'translateX(100%)',
  };

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  public next(): void {
    if (this.slidingBlocked) {
      return;
    }
    this.isSlidedRight = true;
    this._cdr.detectChanges();
    if (this.currentIndex === this.items.length - 1) {
      this.currentIndex = 0;
      this._cdr.markForCheck();
      return;
    }
    this.currentIndex += 1;
    this._cdr.markForCheck();
  }

  public prev(): void {
    if (this.slidingBlocked) {
      return;
    }
    this.isSlidedRight = false;
    this._cdr.detectChanges();
    if (this.currentIndex === 0) {
      this.currentIndex = this.items.length - 1;
      this._cdr.markForCheck();
      return;
    }
    this.currentIndex -= 1;
    this._cdr.markForCheck();
  }

  public show(i: number): void {
    if (this.slidingBlocked) {
      return;
    }
    this.isSlidedRight = this.currentIndex < i;
    this._cdr.detectChanges();
    this.currentIndex = i;
    this._cdr.markForCheck();
  }

  public animationStart(): void {
    this.slidingBlocked = true;
  }

  public animationEnd(): void {
    this.slidingBlocked = false;
  }
}
