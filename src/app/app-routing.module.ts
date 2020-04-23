import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadChildren: () =>
        import('./content/main-content/main-content.module')
        .then(mod => mod.MainContentModule),
        data: {
          state: 'products',
        },
  },
  {
    path: 'cart',
    loadChildren: () =>
        import('./content/cart/cart.module')
        .then(mod => mod.CartModule),
        data: {
          state: 'cart',
        },
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./content/main-content/product-list/product-list.module')
        .then(
        mod => mod.ProductListModule,
      ),
    data: {
      state: 'product',
    },
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
