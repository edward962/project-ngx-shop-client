import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import {
  slideAnimation,
  initSliderAnimation,
  Slider,
} from 'src/app/shared/utils/slider';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import { go } from 'src/app/store/actions/router.actions';

export interface IBanner {
  subCategoryId: string;
  title: string;
  image: string;
}

@Component({
  selector: 'ngx-shop-banner',
  templateUrl: './banner.component.html',
  animations: [slideAnimation, initSliderAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// @ts-ignore
export class BannerSliderComponent extends Slider<IBanner> {
  @Input()
  // @ts-ignore
  public items: IBanner[] = [];
  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _store: Store<IStore>
  ) {
    super(_cdr);
  }

  public redirectTo(subCatId: string): void {
    this._store.dispatch(
      go({
        path: ['/category', subCatId],
      })
    );
  }
}
