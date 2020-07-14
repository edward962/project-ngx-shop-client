import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import {
  getProductPending,
  clearProduct,
} from './store/actions/product.actions';
import { UnSubscriber } from 'src/app/shared/utils/unsubscriber';
import { takeUntil } from 'rxjs/operators';
import { IProductState } from './store/reducers/product.reducer';

@Component({
  selector: 'ngx-shop-product',
  templateUrl: './product.component.html',
})
export class ProductComponent extends UnSubscriber
  implements OnInit, OnDestroy {
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _store: Store<IStore>
  ) {
    super();
  }

  public product$?: Observable<IProductState> = this._store
    .select('product')
    .pipe(takeUntil(this.unsubscribe$$));

  public ngOnInit(): void {
    // TODO need resolver !!!!
    const { product } = this._activatedRoute.snapshot.params;
    this._store.dispatch(getProductPending({ id: product }));
  }
  public ngOnDestroy(): void {
    this._store.dispatch(clearProduct());
  }
}
