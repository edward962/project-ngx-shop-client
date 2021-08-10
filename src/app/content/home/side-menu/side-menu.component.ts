import { Component, Input } from '@angular/core';
import { ICategory } from '@root-store/reducers/categories.reducer';
import { go } from '@root-store/actions/router.actions';
import { Store } from '@ngrx/store';
import { IStore } from '@root-store/reducers';

@Component({
	selector: 'ngx-shop-side-menu',
	templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
	@Input()
	public categories: ICategory[] | undefined = [];

	public currentName: string | null = null;

	public constructor(private _store: Store<IStore>) {}

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
			}),
		);
	}
}
