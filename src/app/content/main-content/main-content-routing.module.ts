import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContentComponent } from './main-content.component';

const routes: Routes = [
  {
    path: '',
    component: MainContentComponent,
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./products/products.module').then(
        mod => mod.ProductsModule,
      ),
    data: {
      state: 'product',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainContentRoutingModule {
}
