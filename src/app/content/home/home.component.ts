import {loadingSugestedProductAndCategories } from './../../store/selectors/category.selectors';
import { IProductsState } from 'src/app/content/category/store/reducers/products.reducer';
import { ICategoryState } from './../../store/reducers/categories.reducer';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { getCategoriesPending } from 'src/app/store/actions/category.actions';
import { ICategory } from 'src/app/store/reducers/categories.reducer';
import { IStore } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { getSuggestedProductsPending } from './store/actions/suggested-products.actions';
import { UnSubscriber } from 'src/app/shared/utils/unsubscriber';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IBanner } from './baner/banner.component';




@Component({
  selector: 'ngx-shop-products',
  templateUrl: './home.component.html',
})
export class HomeComponent extends UnSubscriber implements OnInit {
  public categories: ICategory[] = [];
  public categories$: Observable<ICategoryState> = this._store
    .select('categories')
    .pipe(takeUntil(this.unsubscribe$$));
  public products$: Observable<IProductsState> = this._store
    .select('suggestedProducts')
    .pipe(takeUntil(this.unsubscribe$$));
  public form: FormGroup = this._fb.group({
    currentSubCategory: [''],
  });
  public loading$: Observable<boolean> = this._store.select(loadingSugestedProductAndCategories);
  public bunerItems: IBanner[] = [{
    subCategoryId: '5ef4c36bf63cdf28bc1ac60f',
    title: 'КОМПЬЮТЕРЫ',
  }, {
    subCategoryId: '5ef4c36bf63cdf28bc1ac58d', title: 'СМАРТФОНЫ',
  }, {
    subCategoryId: '5ef4c36bf63cdf28bc1ac68d',
    title: ' АВТОЗВУК',
  }];

  constructor(
    private readonly _store: Store<IStore>,
    private readonly _fb: FormBuilder
  ) {
    super();
  }

  public ngOnInit(): void {
    this._store.dispatch(getCategoriesPending());
    this._store.dispatch(getSuggestedProductsPending());
  }
}
