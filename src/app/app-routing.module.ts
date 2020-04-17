import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./content/main-content/main-content.module').then(mod => mod.MainContentModule),
  },
  {
    path: 'cart',
    loadChildren: () => import('./content/cart/cart.module').then(mod => mod.CartModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
