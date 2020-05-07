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
    loadChildren: () =>
        import('./product/product.module')
        .then(mod => mod.ProductModule),
        data: {
          state: 'product',
        },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {
}
