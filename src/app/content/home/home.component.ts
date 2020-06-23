import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { getCategoriesPending } from 'src/app/store/actions/category.actions';
import { ICategory } from 'src/app/store/reducers/categories.reducer';
import { IStore } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { getSuggestedProductsPending } from './store/actions/suggested-products.actions';
import { UnSubscriber } from 'src/app/shared/utils/unsubscriber';
import { takeUntil } from 'rxjs/operators';
import { IProduct } from 'src/app/shared/interfaces/product.inteface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-shop-products',
  templateUrl: './home.component.html',
})
export class HomeComponent extends UnSubscriber implements OnInit {
  public categories: ICategory[] = [];
  public imagesDef = [
    {
      url: 'assets/images/20389.jpg',
      title: '',
    },
    {
      url: 'assets/images/20473.jpg',
      title: '',
    },
    {
      url: 'assets/images/20677.jpg',
      title: '',
    },
  ];
  public categories$: Observable<ICategory[]> = this._store
    .select('categories', 'items')
    .pipe(takeUntil(this.unsubscribe$$));
  public products$: Observable<IProduct[]> = this._store
    .select('suggestedProducts', 'items')
    .pipe(takeUntil(this.unsubscribe$$));
  public form: FormGroup = this._fb.group({
      currentSubCategory: [''],
    });

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
