import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartGuard } from './shared/services/cart.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // tslint:disable-next-line:typedef
    loadChildren: () =>
      // tslint:disable-next-line:typedef
      import('./content/home/home.module').then((mod) => mod.HomeModule),
    data: {
      state: 'products',
    },
  },
  {
    path: 'cart',
    // tslint:disable-next-line:typedef
    loadChildren: () =>
      // tslint:disable-next-line:typedef
      import('./content/cart/cart.module').then((mod) => mod.CartModule),
    canActivate: [CartGuard],
    data: {
      state: 'cart',
    },
  },
  {
    path: 'category',
    // tslint:disable-next-line:typedef
    loadChildren: () =>
      import('./content/category/category.module').then(
        // tslint:disable-next-line:typedef
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
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
