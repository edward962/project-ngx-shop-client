import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list.component';


const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'one-product',
    loadChildren: () =>
        import('./one-product/one-product.module')
        .then(mod => mod.OneProductModule),
        data: {
          state: 'product',
        },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductListRoutingModule {
}
