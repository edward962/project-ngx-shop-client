import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IStore } from '../store/reducers';
import { trueProductsCount } from '../store/reducers/cart.reducer';

@Component({
  selector: 'ngx-shop-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public productCounter$: Observable<number> = this.store.select(trueProductsCount);

  constructor(private readonly store: Store<IStore>) {
  }
}
