import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IStore } from '../store/reducers';
import { trueProductsCount } from '../store/reducers/cart.reducer';

@Component({
  selector: 'app-ngx-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public productCounter$!: Observable<number>;
  constructor(private readonly store: Store<IStore>) {}
  public ngOnInit(): void {
    this.productCounter$ = this.store.select(trueProductsCount);
  }
}
