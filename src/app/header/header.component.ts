import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IStore } from '@root-store/reducers';
import { trueProductsCount } from '@root-store/reducers/cart.reducer';
import { takeUntil } from 'rxjs/operators';
import { UnSubscriber } from '@shared/utils/unsubscriber';
import { ICategory } from '@root-store/reducers/categories.reducer';
import { TooltipPosition } from '@shared/directives/directive';
import { getCategoriesPending } from '../store/actions/category.actions';

@Component({
	selector: 'ngx-shop-header',
	templateUrl: './header.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends UnSubscriber {
	public productCounter$: Observable<number> = this._store
		.select(trueProductsCount)
		.pipe(takeUntil(this.unsubscribe$$));

	public categories$: Observable<ICategory[]> = this._store
		.select('categories', 'items')
		.pipe(takeUntil(this.unsubscribe$$));

	public position: TooltipPosition = TooltipPosition.LEFT;

	public constructor(private readonly _store: Store<IStore>) {
		super();
	}

	public clickMenu(): void {
		this.categories$.subscribe((item): void => {
			if (!item.length) {
				this._store.dispatch(getCategoriesPending());
			}
		});
	}
}
