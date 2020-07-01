import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IStore } from '../store/reducers';
import { trueProductsCount } from '../store/reducers/cart.reducer';
import { takeUntil } from 'rxjs/operators';
import { UnSubscriber } from '../shared/utils/unsubscriber';
import { MobileMenuComponent } from './mobile-modal/mobile-menu.component';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'ngx-shop-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent extends UnSubscriber {
  public productCounter$: Observable<number> = this._store.select(trueProductsCount)
    .pipe(takeUntil(this.unsubscribe$$));

  constructor(
    private readonly _store: Store<IStore>,
    private readonly _modalService: ModalService
    ) {
    super();
  }

  public clickMenu(): void {
    this._modalService.open({
      component: MobileMenuComponent,
      context: {
        save: (): void => {
          this._modalService.close();
        },
        close: (): void => {
          this._modalService.close();
        },
      },
    });
  }
}
