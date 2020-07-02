import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import { Observable } from 'rxjs/internal/Observable';
import { getProductPending } from './store/actions/product.actions';
import { UnSubscriber } from 'src/app/shared/utils/unsubscriber';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { IProduct } from 'src/app/shared/interfaces/product.inteface';

@Component({
  selector: 'ngx-shop-product',
  templateUrl: './product.component.html',
})
export class ProductComponent extends UnSubscriber implements OnInit {
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _store: Store<IStore>
  ) {
    super();
  }

  public product$?: Observable<IProduct> = this._store
    .select('product', 'item')
    .pipe(takeUntil(this.unsubscribe$$));

  public ngOnInit(): void {
    const { id } = this._activatedRoute.snapshot.queryParams;
    this._store.dispatch(getProductPending({ id }));
  }
}
