import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
  },
  {
    path: 'product',
    // tslint:disable-next-line:typedef
    loadChildren: () =>
      import('./content/product/product.module')
        // tslint:disable-next-line:typedef
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
