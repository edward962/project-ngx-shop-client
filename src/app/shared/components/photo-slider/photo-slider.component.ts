import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { IProductImage } from 'src/app/shared/interfaces/product.inteface';
import { slideAnimation } from './photo-slider.animation';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import { go } from 'src/app/store/actions/router.actions';

@Component({
  selector: 'ngx-shop-photo-slider',
  templateUrl: './photo-slider.component.html',
  animations: slideAnimation,
})

export class PhotoSliderComponent {
  @Input()
  public images!: IProductImage[];
  @Input()
  public slideClass!: string;
  @Input()
  public isBottomButtons = true;
  @Input()
  public isBaner = false;
  public banerListCategories = [{
    subCategoryId: '5ef4c36bf63cdf28bc1ac60f',
    title: 'КОМПЬЮТЕРЫ',
  }, {
    subCategoryId: '5ef4c36bf63cdf28bc1ac58d', title: 'СМАРТФОНЫ',
  }, {
    subCategoryId: '5ef4c36bf63cdf28bc1ac68d',
    title: ' АВТОЗВУК',
  }];
  public currentIndex = 0;

  public animateRight = {
    translateEnter: 'translateX(100%)',
    translateLeave: 'translateX(-100%)',
  };
  public animateLeft = {
    translateEnter: 'translateX(-100%)',
    translateLeave: 'translateX(100%)',
  };
  public isSlidedRight = true;
  public slidingBlocked = false;
  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _store: Store<IStore>) { }


  public next( arr: any): void {
    if (this.slidingBlocked) {
      return;
    }
    this.isSlidedRight = true;
    this._cdr.detectChanges();
    if (this.currentIndex === arr.length - 1) {
      this.currentIndex = 0;
      return;
    }
    this.currentIndex += 1;
  }

  public prev(arr: any): void {
    if (this.slidingBlocked) {
      return;
    }
    this.isSlidedRight = false;
    this._cdr.detectChanges();
    if (this.currentIndex === 0) {
      this.currentIndex = arr.length - 1;
      return;
    }
    this.currentIndex -= 1;
  }

  public show(i: number): void {
    if (this.slidingBlocked) {
      return;
    }
    this.isSlidedRight = this.currentIndex < i;
    this._cdr.detectChanges();
    this.currentIndex = i;
  }

  public animationStart(): void {
    this.slidingBlocked = true;
  }

  public animationEnd(): void {
    this.slidingBlocked = false;
  }
  public redirectTo(subCatId: string): void {
    this._store.dispatch(
      go({
        path: ['/category'],
        query: {
          subCatId: subCatId,
        },
      })
    );
  }
}
