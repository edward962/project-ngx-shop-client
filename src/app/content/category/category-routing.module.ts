import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';

const routes: Routes = [
	{
		path: ':subCategory',
		component: CategoryComponent,
	},
	{
		path: ':subCategory/:product',
		// eslint-disable-next-line
    loadChildren: () =>
			import('./content/product/product.module')
				// eslint-disable-next-line
        .then((mod) => mod.ProductModule),

		data: {
			state: 'product',
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CategoryRoutingModule {}
