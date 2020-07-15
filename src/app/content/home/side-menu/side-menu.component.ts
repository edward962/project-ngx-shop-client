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
  public currentName: string | null = null;

  constructor(private _store: Store<IStore>) {}

  public hover(name: string): void {
    this.currentName = name;
  }
  public mouseLeave(): void {
    this.currentName = null;
  }
  public redirectTo(subCategory: string): void {
    this._store.dispatch(
      go({
        path: ['/category', subCategory],
      })
    );
  }
}
