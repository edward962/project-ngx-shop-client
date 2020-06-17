import { Component, Input } from '@angular/core';
import { ICategory } from 'src/app/store/reducers/categories.reducer';
import { go } from 'src/app/store/actions/router.actions';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';

@Component({
  selector: 'ngx-shop-side-menu',
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  @Input()
  public categories: ICategory[] = [];
  public currentIndex: number | null = null;

  constructor(private _store: Store<IStore>) {}

  public hover(index: number) {
    this.currentIndex = index;
  }
  redirectTo(subCatId: string) {
    this._store.dispatch(
      go({
        path: ['/category'],
        query: {
          subCatId: subCatId,
          searchByName: [],
          brands: [],
          prices: '0,2000',
        },
      })
    );
  }
}
