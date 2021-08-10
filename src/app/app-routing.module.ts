import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartGuard } from '@shared/services/cart.guard';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		// eslint-disable-next-line
    loadChildren: () =>
			// eslint-disable-next-line
      import('./content/home/home.module').then((mod) => mod.HomeModule),
		data: {
			state: 'products',
		},
	},
	{
		path: 'cart',
		// eslint-disable-next-line
    loadChildren: () =>
			// eslint-disable-next-line
      import('./content/cart/cart.module').then((mod) => mod.CartModule),
		canActivate: [CartGuard],
		data: {
			state: 'cart',
		},
	},
	{
		path: 'category',
		// eslint-disable-next-line
    loadChildren: () =>
			import('./content/category/category.module').then(
				// eslint-disable-next-line
        (mod) => mod.CategoryModule
			),
		data: {
			state: 'category',
		},
	},
	{
		path: '**',
		redirectTo: 'products',
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'top',
			relativeLinkResolution: 'legacy',
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
