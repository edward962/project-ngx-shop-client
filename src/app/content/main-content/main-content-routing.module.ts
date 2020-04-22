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
      import('./product-list/product-list.module').then(
        mod => mod.ProductListModule,
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
