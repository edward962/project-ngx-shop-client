import { loadingSuggestedProductAndCategories } from './../../store/selectors/category.selectors';
import { IProductsState } from 'src/app/content/category/store/reducers/products.reducer';
import { ICategoryState } from './../../store/reducers/categories.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { getCategoriesPending } from 'src/app/store/actions/category.actions';
import { ICategory } from 'src/app/store/reducers/categories.reducer';
import { IStore } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import {
  getSuggestedProductsPending,
  clearSuggestedProducts,
} from './store/actions/suggested-products.actions';
import { UnSubscriber } from 'src/app/shared/utils/unsubscriber';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IBanner } from './banner/banner.component';

@Component({
  selector: 'ngx-shop-products',
  templateUrl: './home.component.html',
})
export class HomeComponent extends UnSubscriber implements OnInit, OnDestroy {
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
  public loading$: Observable<boolean> = this._store.select(
    loadingSuggestedProductAndCategories
  );
  public bannerItems: IBanner[] = [
    {
      subCategoryId: 'kompyutery-noutbuki-i-po',
      title: 'Компьютеры, ноутбуки и ПО',
      image: '/assets/images/carousel-laptop.png',
    },
    {
      subCategoryId: 'smartfony-i-gadzhety',
      title: 'Смартфоны и гаджеты',
      image: '/assets/images/carousel-phone.png',
    },
    {
      subCategoryId: 'igry-i-xobbi',
      title: ' Игры и хобби',
      image: '/assets/images/carousel-console.png',
    },
  ];

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
  public ngOnDestroy(): void {
    this._store.dispatch(clearSuggestedProducts());
  }
}
