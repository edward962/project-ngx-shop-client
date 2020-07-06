import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import { getProductPending } from './store/actions/product.actions';
import { UnSubscriber } from 'src/app/shared/utils/unsubscriber';
import { takeUntil } from 'rxjs/operators';
import { IProduct } from 'src/app/shared/interfaces/product.inteface';
import { IProductState } from './store/reducers/product.reducer';

@Component({
  selector: 'ngx-shop-product',
  templateUrl: './product.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent extends UnSubscriber implements OnInit {
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
    const { id } = this._activatedRoute.snapshot.queryParams;
    this._store.dispatch(getProductPending({ id }));
  }
}
