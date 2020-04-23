import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneProductComponent } from './one-product.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: OneProductComponent,
      },
    ]),
  ],
})
export class OneProductModule {}
