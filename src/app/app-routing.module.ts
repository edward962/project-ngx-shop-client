import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartGuard } from './shared/services/cart.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./content/home/home.module').then(
        (mod) => mod.HomeModule
      ),
    data: {
      state: 'products',
    },
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./content/cart/cart.module').then((mod) => mod.CartModule),
    canActivate: [CartGuard],
    data: {
      state: 'cart',
    },
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./content/category/category.module').then(
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
