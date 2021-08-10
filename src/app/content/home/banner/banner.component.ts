import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { slideAnimation, initSliderAnimation, Slider } from '@shared/utils/slider';
import { Store } from '@ngrx/store';
import { IStore } from '@root-store/reducers';
import { go } from '@root-store/actions/router.actions';

export interface IBanner {
	subCategoryId: string;
	title: string;
	image: string;
}

@Component({
	selector: 'ngx-shop-banner',
	templateUrl: './banner.component.html',
	animations: [slideAnimation, initSliderAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerSliderComponent extends Slider<IBanner> {
	@Input()
	public items: IBanner[] = [];

	public constructor(_cdr: ChangeDetectorRef, private readonly _store: Store<IStore>) {
		super(_cdr);
	}

	public redirectTo(subCatId: string): void {
		this._store.dispatch(
			go({
				path: ['/category', subCatId],
			}),
		);
	}
}
