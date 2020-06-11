import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';

import { Observable } from 'rxjs/internal/Observable';
import { getProductPending } from './store/actions/product.actions';

@Component({
  selector: 'ngx-shop-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    public productsService: ProductsService,
    private store: Store<IStore>,

  ) { }

  // tslint:disable-next-line: no-any
  public query: any;
  // tslint:disable-next-line: no-any
  public product$?: Observable<any> = this.store.select('product', 'item');
  // tslint:disable-next-line: no-any
  public product: any;

  public ngOnInit(): void {
    this.query = this.activatedRoute.snapshot.queryParams;
    const { id } = this.query;
    this.store.dispatch(getProductPending({ id }));
    this.product$?.subscribe((product) => (this.product = product));
  }

}
